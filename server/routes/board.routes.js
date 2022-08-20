import boards from "../controllers/board.controller.js";
import express from "express";

const boardRouter = express.Router();

// Create a new board
boardRouter.post("/", boards.create);
// Retrieve all boards
boardRouter.get("/", boards.findAll);
// // Retrieve all published boards
// router.get("/published", boards.findAllPublished);
// Retrieve a single board with id
// router.get("/:id", boards.findOne);
// Update a board with id
boardRouter.put("/:id", boards.update);
// // Delete a board with id
// router.delete("/:id", boards.delete);
// // Delete all boards
// router.delete("/", boards.deleteAll);


export default boardRouter;
