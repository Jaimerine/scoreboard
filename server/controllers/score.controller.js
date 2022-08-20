import db from "../models/index.js";
const Score = db.scores;

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
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "An error occurred while adding the score.",
      });
    });
};


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


const scores = { create, findByBoardAndPlayer, findByBoard };

export default scores;




