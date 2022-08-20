import dbUrl from "../config/db.config.js";
import user from "./user.model.js";
import player from "./player.model.js";
import board from "./board.model.js";
import score from "./score.model.js";
import message from "./message.model.js";
import mongoose from "mongoose";

mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.url = dbUrl;
db.users = user(mongoose);
db.players = player(mongoose);
db.boards = board(mongoose);
db.scores = score(mongoose);
db.messages = message(mongoose);

export default db;
