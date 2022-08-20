import messages from "../controllers/message.controller.js";
import express from "express";

const messageRouter = express.Router();

// Create a new message
messageRouter.post("/", messages.create);
// Retrieve all messages
messageRouter.get("/", messages.findAll);
// // Retrieve all published messages
// router.get("/published", messages.findAllPublished);
// Retrieve a single message with id
// router.get("/:id", messages.findOne);
// // Update a message with id
// router.put("/:id", messages.update);
// // Delete a message with id
// router.delete("/:id", messages.delete);
// // Delete all messages
// router.delete("/", messages.deleteAll);


export default messageRouter;
