import db from "../models/index.js";
const Message = db.messages;

const create = (req, res) => {
  //validate request
  if (!req.body.content) {
    res.status(400).send({ message: "Content cannot be empty!" });
    return;
  }
  //create message
  const message = new Message({
    userId: req.body.userId,
    name: req.body.name,
    content: req.body.content,
  });
  //save message in the database
  message
    .save(message)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the message.",
      });
    });
};


//retrieve all messages for board
const findAll = (req, res) => {
  const boardId = req.query.boardId;
  var condition = boardId
    ? { boardId: { $regex: new RegExp(boardId), $options: "i" } }
    : {};
  Message.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving messages.",
      });
    });
};

// Retrieve a single object

// Find a single Tutorial with an id:

// exports.findOne = (req, res) => {
//   const id = req.params.id;
//   Tutorial.findById(id)
//     .then(data => {
//       if (!data)
//         res.status(404).send({ message: "Not found Tutorial with id " + id });
//       else res.send(data);
//     })
//     .catch(err => {
//       res
//         .status(500)
//         .send({ message: "Error retrieving Tutorial with id=" + id });
//     });
// };

// Update an object

// Update a Tutorial identified by the id in the request:

// exports.update = (req, res) => {
//   if (!req.body) {
//     return res.status(400).send({
//       message: "Data to update can not be empty!"
//     });
//   }
//   const id = req.params.id;
//   Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
//     .then(data => {
//       if (!data) {
//         res.status(404).send({
//           message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
//         });
//       } else res.send({ message: "Tutorial was updated successfully." });
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Error updating Tutorial with id=" + id
//       });
//     });
// };

// Delete an object

// Delete a Tutorial with the specified id:

// exports.delete = (req, res) => {
//   const id = req.params.id;
//   Tutorial.findByIdAndRemove(id)
//     .then(data => {
//       if (!data) {
//         res.status(404).send({
//           message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
//         });
//       } else {
//         res.send({
//           message: "Tutorial was deleted successfully!"
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Could not delete Tutorial with id=" + id
//       });
//     });
// };

// Delete all objects

// Delete all Tutorials from the database:

// exports.deleteAll = (req, res) => {
//   Tutorial.deleteMany({})
//     .then(data => {
//       res.send({
//         message: `${data.deletedCount} Tutorials were deleted successfully!`
//       });
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while removing all tutorials."
//       });
//     });
// };

// Find all objects by condition

// Find all Tutorials with published = true:

// exports.findAllPublished = (req, res) => {
//   Tutorial.find({ published: true })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving tutorials."
//       });
//     });
// };

// This controller can be modified a little to return pagination response:

// {
//     "totalItems": 8,
//     "tutorials": [...],
//     "totalPages": 3,
//     "currentPage": 1
// }

// You can find more details at:
// Server side Pagination in Node.j with MongoDB & Mongoose

const messages = { create, findAll };

export default messages;




