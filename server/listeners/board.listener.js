import scoreHandler from "./score.listener.js"
import playerHandler from "./player.listener.js"

export let boardId;

const boardHandler = (io, socket) => {

  //disconnect
  socket.on("disconnect", () => {
    if (boardId) {
      io.to(boardId).emit("leftBoard", socket.id);
    } 
  });
  
  //join board
  socket.on("joinBoard", (bid) => { 
    boardId = bid;

    try {
      socket.join(boardId);
      socket.emit("joinedBoard", boardId);
    } catch (e) {
      console.log("[error]", "join board :", e);
      socket.emit("error", "Could not join board.");
    }
  })

  socket.on("boardCreated", (boardId) => { 
    console.log("created", boardId)
  })

  //leave board
  socket.on("leaveBoard", (boardId) => {
    try {
      socket.leave(boardId);
      io.to(boardId).emit("leftBoard", socket.id);
    } catch (e) {
      console.log("[error]", "leave board :", e);
      socket.emit("error", "Could not leave board.");
    }
  }); 

  //handle score updates
  scoreHandler(io, socket, boardId);
  playerHandler(io, socket, boardId)

}

export default boardHandler;