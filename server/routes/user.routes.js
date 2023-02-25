import users from "../controllers/user.controller.js";
import express from "express";

const userRouter = express.Router();

//create a new user
userRouter.post("/", users.create);

//retrieve all users
userRouter.get("/", users.findAll);

export default userRouter;
