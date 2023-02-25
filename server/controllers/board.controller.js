import db from "../models/index.js";
const Board = db.boards;

const create = (req, res) => {
  //validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Name cannot be empty!" });
    return;
  }
  // if (!req.body.settings) {
  //   res.status(400).send({ message: "Name cannot be empty!" });
  //   return;
  // }

  //create board
  const board = new Board({
    name: req.body.name,
    players: [],
    settings: req.body.settings
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

//retrieve single board by id
const findOne = (req, res) => {
    if (!req.params.id) {
        res.status(400).send({ message: "You must provide a board ID!" });
        return;
    }
    Board.findById(req.params.id)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
              err.message || "An error occurred while retrieving the board with id: " + req.params.id,
        });
      });
};

const update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Data to update can not be empty!" });
    }
    if (!req.params.id) {
        return res.status(400).send({ message: "You must provide a board ID!" });
    }

    const id = req.params.id;
    console.log("HERE", req.params.id)

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

// const updateDate = (id) => {
//   Board.findByIdAndUpdate(id, { updatedAt: new Date() }, { useFindAndModify: false })
//       .then((data) => {
//         console.log(data);
//         return data;
//       })
//       .catch((err) => {
//         console.log("Error updating board updatedAt date: " + err);
//       });
// }


const boards = { create, findAll, findOne, update };

export default boards;




