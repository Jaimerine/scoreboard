import scores from "../controllers/score.controller.js";
import express from "express";

const scoreRouter = express.Router();

// Create a new score
scoreRouter.post("/", scores.create);
// Retrieve all scores by user and by board
// scoreRouter.get("/", scores.findAll);
scoreRouter.get("/", scores.findByBoard);
// // Retrieve all published users
// router.get("/published", users.findAllPublished);
// Retrieve a single message with id
// router.get("/:id", users.findOne);
// // Update a message with id
// router.put("/:id", users.update);
// // Delete a message with id
// router.delete("/:id", users.delete);
// // Delete all users
// router.delete("/", users.deleteAll);

export default scoreRouter;
