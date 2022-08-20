import db from "../models/index.js";
const Board = db.boards;

const create = (req, res) => {
  //validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Name cannot be empty!" });
    return;
  }
  //create board
  const board = new Board({
    name: req.body.name,
    players: []
  });
  //save board in the database
  board
    .save(board)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "An error occurred while creating the board.",
      });
    });
};


//retrieve all boards for user
const findAll = (req, res) => {
  const userId = req.query.userId;
  var condition = userId
    ? { userId: { $regex: new RegExp(userId), $options: "i" } }
    : {};
  Board.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "An error occurred while retrieving boards.",
      });
    });
};

const update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const id = req.query.id;
  Board.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Board with id=${id}. Maybe Board was not found!`,
        });
      } else res.send({ message: "Board was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Board with id=" + id,
      });
    });
};


const boards = { create, findAll, update };

export default boards;




