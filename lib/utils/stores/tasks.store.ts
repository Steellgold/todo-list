import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Task } from "../types";
import { TaskStore } from "./tasks.types";

export const useTasksStore = create(
  persist<TaskStore>(set => ({
    tasks: [] as Task[],
    completedTasks: [] as Task[],
    completeTask: task => set(state => ({
      completedTasks: [...state.completedTasks, task],
      tasks: state.tasks.filter(t => t.id !== task.id)
    })),
    setTasks: tasks => set({ tasks }),
    addTask: task => set(state => ({
      tasks: [...state.tasks, task]
    })),
    deleteTask: id => set(state => ({
      tasks: state.tasks.filter(task => task.id !== id)
    })),
    deleteAllTasks: () => set({ tasks: [] })
  }),

  { name: "tasks" })
);