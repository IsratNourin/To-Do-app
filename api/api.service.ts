import http from "./common";
import TodoData from "../types/TodoData.type";

class TodoAppService {
  getAll() {
    return http.get<Array<TodoData>>("/tasks?page=1&limit=100");
  }

  get(id: number) {
    return http.get<TodoData>(`/tasks/${id}`);
  }

  create(data: TodoData) {
    return http.post<TodoData>("/tasks", data);
  }

  update(id: number, data: TodoData) {
    return http.put<any>(`/tasks/${id}`, data);
  }

  delete(id: any) {
    return http.delete<any>(`/tasks/${id}`);
  }
}

export default new TodoAppService();
