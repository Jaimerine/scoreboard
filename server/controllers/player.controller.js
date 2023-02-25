import db from "../models/index.js";
const Player = db.players;
const Board = db.boards;

const create = (req, res) => {
  //validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Name cannot be empty!" });
    return;
  }
  if (!req.body.boardId) {
    res.status(400).send({ message: "Board Id cannot be empty!" });
    return;
  }
  //create user
  const player = new Player({
    name: req.body.name,
    boardId: req.body.boardId,
    userId: req.body.userId
  });
  //save user in the database
  player
    .save(player)
    .then((data) => {
      //add user to board
      Board.findOneAndUpdate(
        { _id: req.body.boardId },
        {
          $push: {
            players: {
              playerId: data.id,
              userId: data.userId
            }
          },
        },
        { upsert: true } //creates new board, if doesn't exist
      )
        .then(() => {
          res.status(200).send(data);
        })
        .catch ((err) => {
          res.status(500).send({
          message:
            err.message || "An error occurred while creating the player.",
          });
        })
      })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "An error occurred while creating the player.",
      });
    });
};

const update = (req, res) => {
    //validate request
    //TODO: currently only updating name, update to be more flexible when/if more variables added
    if (!req.body.name || !req.body.name.length) {
        res.status(400).send({ message: "Name cannot be empty!" });
        return;
    }
    if (!req.params.id) {
        res.status(400).send({ message: "Player Id cannot be empty!" });
        return;
    }

    //update player
    Player.findByIdAndUpdate(
        req.params.id,
        {
            $set: {
                name: req.body.name
            },
        },
        { upsert: false } //creates new player, if doesn't exist
    )
        .then(() => {
            res.status(200).send({ message: "Player successfully updated." });
        })
        .catch ((err) => {
            res.status(500).send({
                message:
                    err.message || "An error occurred while updating the player.",
            });
        })

}

//retrieve single player by id
const findOne = (req, res) => {
    Player.findById(req.params.id)
        .then(data => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "An error occurred while retrieving the player.",
            });
        });
}

//retrieve all players in board
const findByBoard = (req, res) => {
  const boardId = req.query.boardId;
  if (!boardId.length) {
    res.status(400).send({ message: "Board Id cannot be empty!" });
    return;
  }
  Player.find({ boardId: boardId })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "An error occurred while retrieving the players.",
      });
    });
};


const players = { create, update, findOne, findByBoard };

export default players;




