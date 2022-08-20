import http from "../http-common.js";

class BoardDataService {
  getAll() {
    return http.get("/boards");
  }
  get(id) {
    return http.get(`/boards/${id}`);
  }
  create(data) {
    return http.post("/boards/", data);
  }
  update(id, data) {
    return http.put(`/boards/${id}`, data);
  }
  delete(id) {
    return http.delete(`/boards/${id}`);
  }
  deleteAll() {
    return http.delete(`/boards`);
  }
  findByTitle(title) {
    return http.get(`/boards?title=${title}`);
  }
}
export default new BoardDataService();
