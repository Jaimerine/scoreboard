import db from "../models/index.js";
const Player = db.players;

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
    userId: req.body.userId
  });
  //save user in the database
  player
    .save(player)
    .then((data) => {
      //add user to board
      db.boards.findOneAndUpdate(
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


//retrieve all players in board
const findByBoard = (req, res) => {
  const boardId = req.query.boardId;
  const condition = boardId
    ? { boardId: { $regex: new RegExp(boardId), $options: "i" } }
    : {};
  Player.find(condition)
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


const players = { create, findByBoard };

export default players;




