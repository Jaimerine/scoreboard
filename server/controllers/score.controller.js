import db from "../models/index.js";
const Score = db.scores;
const Board = db.scores;

const create = (req, res) => {
  //validate request
  if (!req.body.playerId) {
    res.status(400).send({ message: "Player Id cannot be empty!" });
    return;
  }
  if (!req.body.boardId) {
    res.status(400).send({ message: "Board Id cannot be empty!" });
    return;
  }
  if (!req.body.score) {
    res.status(400).send({ message: "Score cannot be empty!" });
    return;
  }
  if (!req.body.date) {
    res.status(400).send({ message: "Date cannot be empty!" });
    return;
  }
  //create score
  const score = new Score({
    playerId: req.body.playerId,
    boardId: req.body.boardId,
    score: req.body.score,
    date: req.body.date,
  });
  //save score in the database
  score
    .save(score)
    .then((data) => {
      Board.findByIdAndUpdate(req.body.boardId, { updatedAt: new Date() })
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "An error occurred while adding the score.",
      });
    });
};

const update = (req, res) => {
  //validate request
  if (!req.body.score || Number.isNaN(req.body.score)) {
    res.status(400).send({ message: "Score cannot be empty!" });
    return;
  }
  if (!req.params.id) {
    res.status(400).send({ message: "Score Id cannot be empty!" });
    return;
  }

  //update player
  db.scores.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          score: req.body.score
        },
      },
      { upsert: false } //creates new score, if doesn't exist
  )
      .then(() => {
        res.status(200).send({ message: "Score successfully updated." });
      })
      .catch ((err) => {
        res.status(500).send({
          message:
              err.message || "An error occurred while updating the score.",
        });
      })
}

//retrieve all scores for user in board
const findByBoardAndPlayer = (req, res) => {
  const boardId = req.query.boardId;
  const playerId = req.query.playerId;

  const condition = {
    $and: [
      {
        boardId: { $regex: new RegExp(boardId), $options: "i" },
      },
      {
        playerId: { $regex: new RegExp(playerId), $options: "i" },
      },
    ],
  };

  Score.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "An error occurred while retrieving the users scores.",
      });
    });
};

//retrieve all scores for user in board
const findByBoard = (req, res) => {
  const boardId = req.query.boardId;
  console.log(boardId);

  const condition = boardId
    ? { 'boardId': boardId }
    : {};

  Score.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "An error occurred while retrieving the users scores.",
      });
    });
};


const scores = { create, update, findByBoardAndPlayer, findByBoard };

export default scores;




