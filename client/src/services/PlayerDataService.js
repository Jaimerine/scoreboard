import http from "../http-common.js";

class PlayerDataService {
  getAll() {
    return http.get("/players");
  }
  get(id) {
    return http.get(`/players/${id}`);
  }
  create(data) {
    return http.post("/players/", data);
  }
  update(id, data) {
    return http.patch(`/players/${id}`, data);
  }
  delete(id) {
    return http.delete(`/players/${id}`);
  }
  deleteAll() {
    return http.delete(`/players`);
  }
  getAllByBoard(boardId) {
    return http.get(`/players?boardId=${boardId}`);
  }
}
export default new PlayerDataService();
