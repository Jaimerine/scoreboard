import players from "../controllers/player.controller.js";
import express from "express";

const playerRouter = express.Router();

// Create a new player
playerRouter.post("/", players.create);
// Retrieve all players
// playerRouter.get("/", players.findAll);
playerRouter.get("/", players.findByBoard);
// // Retrieve all published players
// router.get("/published", players.findAllPublished);
// Retrieve a single message with id
// router.get("/:id", players.findOne);
// // Update a message with id
// router.put("/:id", players.update);
// // Delete a message with id
// router.delete("/:id", players.delete);
// // Delete all players
// router.delete("/", players.deleteAll);

export default playerRouter;
