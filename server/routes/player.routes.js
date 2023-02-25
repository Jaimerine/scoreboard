import players from "../controllers/player.controller.js";
import express from "express";

const playerRouter = express.Router();

//create a new player
playerRouter.post("/", players.create);

//retrieve all players by board
playerRouter.get("/", players.findByBoard);

//retrieve specific player
playerRouter.get("/:id", players.findOne);

//update player
playerRouter.patch("/:id", players.update);



//retrieve a single player by id
// router.get("/:id", players.findOne);

//delete a player with id
// router.delete("/:id", players.delete);

//delete all players
// router.delete("/", players.deleteAll);

export default playerRouter;
