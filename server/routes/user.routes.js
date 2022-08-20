import users from "../controllers/user.controller.js";
import express from "express";

const userRouter = express.Router();

// Create a new user
userRouter.post("/", users.create);
// Retrieve all users
userRouter.get("/", users.findAll);
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

export default userRouter;
