import boards from "../controllers/board.controller.js";
import express from "express";

const boardRouter = express.Router();

//create a new board
boardRouter.post("/", boards.create);

//retrieve all boards
boardRouter.get("/", boards.findAll);

//retrieve a single board with id
boardRouter.get("/:id", boards.findOne);

//update a board with id
boardRouter.patch("/:id", boards.update);


//delete a board with id
// router.delete("/:id", boards.delete);


export default boardRouter;
