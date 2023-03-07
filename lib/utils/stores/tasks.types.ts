import { Task } from "../types";

export type TaskStore = {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  deleteTask(id: number): void;
  deleteAllTasks(): void;
}