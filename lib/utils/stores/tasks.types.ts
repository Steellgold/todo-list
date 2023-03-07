import { Task } from "../types";

export type TaskStore = {
  tasks: Task[];
  completedTasks: Task[];
  completeTask(task: Task): void;
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  deleteTask(id: number): void;
  deleteAllTasks(): void;
}