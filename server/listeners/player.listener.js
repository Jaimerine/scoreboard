import { boardId } from "./board.listener.js";

const playerHandler = (io, socket) => {

  //player added
  socket.on("playerAdded", () => {
    if (boardId) {
      io.to(boardId).emit("playerAdded");
    }
  })

  //player edited
  socket.on("playerUpdated", (playerId) => {
    if (boardId) {
      io.to(boardId).emit("playerUpdated: " + playerId);
    }
  })
}

export default playerHandler;