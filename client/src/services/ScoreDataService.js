import http from "../http-common.js";

class ScoreDataService {
  getAll() {
    return http.get("/scores");
  }
  get(id) {
    return http.get(`/scores/${id}`);
  }
  create(data) {
    return http.post("/scores/", data);
  }
  update(id, data) {
    return http.put(`/scores/${id}`, data);
  }
  delete(id) {
    return http.delete(`/scores/${id}`);
  }
  deleteAll() {
    return http.delete(`/scores`);
  }
  getAllByBoard(boardId) {
    return http.get(
      `/scores?boardId=${boardId}`
    );
  }
  getAllByPlayerAndBoard(playerId, boardId) {
    return http.findByPlayerAndBoard(
      `/scores?playerId=${playerId}&boardId=${boardId}`
    );
  }
}
export default new ScoreDataService();
