import db from "../models/index.js";
const User = db.users;

const create = (req, res) => {
  //validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Name cannot be empty!" });
    return;
  }
  // if (!req.body.boardId) {
  //   res.status(400).send({ message: "Board Id cannot be empty!" });
  //   return;
  // }
  //create user
  const user = new User({
    name: req.body.name,
  });
  //save user in the database
  user
    .save(user)
    .then((data) => {
      //add user to board
      // db.boards.findOneAndUpdate(
      //   { _id: req.body.boardId },
      //   { $push: { users: data.id } },
      //   { upsert: true } //creates new board, if doesn't exist
      // )
      //   .then(() => {
          res.status(200).send(data);
        // })
        // .catch ((err) => {
        //   res.status(500).send({
        //   message:
        //     err.message || "An error occurred while creating the user.",
        //   });
        // })
      })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "An error occurred while creating the user.",
      });
    });
};


//retrieve all users in board
const findAll = (req, res) => {

  //update to find players associated with user
  const boardId = req.query.boardId;
  var condition = boardId
    ? { boardId: { $regex: new RegExp(boardId), $options: "i" } }
    : {};
  User.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "An error occurred while retrieving users.",
      });
    });
};


const users = { create, findAll };

export default users;




