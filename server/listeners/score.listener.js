import { boardId } from "./board.listener.js";

const scoreHandler = (io, socket) => {

  //score added
  socket.on("scoreAdded", () => { 
    if (boardId) {
      io.to(boardId).emit("scoreAdded");
    }
  })

  //player edited
  socket.on("scoreUpdated", (scoreId) => {
    if (boardId) {
      io.to(boardId).emit("scoreAdded");
    }
  })

}

export default scoreHandler;