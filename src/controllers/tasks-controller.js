import axios from "axios";
import Task from "../models/Task";

class TasksController {
  baseUrl = "https://expenses-rtk-app-default-rtdb.firebaseio.com/tasks";

  async save(task) {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${this.baseUrl}.json?auth=${token}`,
        task
      );
      return response.data.name;
    } catch (err) {
      console.error("Error saving task:", err);
      return null;
    }
  }

  async read() {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${this.baseUrl}.json?auth=${token}`);
      if (!response.data) return [];

      return Object.entries(response.data).map(([key, item]) => {
        const task = new Task(
          item.name,
          item.categoryId,
          item.categoryName,
          item.details,
          item.startDate,
          item.endDate,
          item.status,
          item.imageUrl || null
        );
        task.id = key;
        return task;
      });
    } catch (err) {
      console.error("Error reading tasks:", err);
      return [];
    }
  }

  async update(task) {
    const token = localStorage.getItem("token");
    try {
      await axios.put(`${this.baseUrl}/${task.id}.json?auth=${token}`, task);
      return true;
    } catch (err) {
      console.error("Error updating task:", err);
      return false;
    }
  }

  async delete(id) {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`${this.baseUrl}/${id}.json?auth=${token}`);
      return true;
    } catch (err) {
      console.error("Error deleting task:", err);
      return false;
    }
  }
}

export default TasksController;
