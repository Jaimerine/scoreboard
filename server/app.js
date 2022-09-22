import express from "express";
const app = express();
import cors from "cors";
import http from "http"; 
const httpServer = http.Server(app);

var corsOptions = {
  origin: "http://localhost:8080",
};
app.use(cors(corsOptions));

//socket io
import { Server } from "socket.io";
const io = new Server(httpServer, {
  cors: {
    origins: ["http://localhost:8080"],
  },
});

//set port, listen for requests
const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

//parse requests of content-type: application/json
app.use(express.json());

//parse requests of content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//database
import db from "./models/index.js";
db.mongoose
  .connect(db.url, {
    dbName: "Scorecard",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

//set api routes
import messageRouter from "./routes/message.routes.js";
import userRouter from "./routes/user.routes.js";
import playerRouter from "./routes/player.routes.js";
import boardRouter from "./routes/board.routes.js";
import scoreRouter from "./routes/score.routes.js";

app.use("/api/v1/messages/", messageRouter);
app.use("/api/v1/users/", userRouter);
app.use("/api/v1/players/", playerRouter);
app.use("/api/v1/boards/", boardRouter);
app.use("/api/v1/scores/", scoreRouter);


//socket conection
import boardHandler from "./listeners/board.listener.js";

io.on("connection", (socket) => {
  console.log("connected with id: " + socket.id);
  socket.emit("connectId", socket.id);

  boardHandler(io, socket);
})