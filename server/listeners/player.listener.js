import { boardId } from "./board.listener.js";

const playerHandler = (io, socket) => {

  //player added
  socket.on("playerAdded", () => {
    if (boardId) {
      io.to(boardId).emit("playerAdded");
    }
  })

}

export default playerHandler;