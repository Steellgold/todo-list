"use client";

import dayjs from "dayjs";
import { useTasksStore } from "./stores/tasks.store";
import { Task } from "./types";

export const useGetTasks = (sortBy: "asc" | "desc" = "asc"): Task[] => {
  const tasks = useTasksStore((state) => state.tasks);

  return tasks.sort((a: Task, b: Task) => {
    if (sortBy === "asc") return dayjs(a.createdAt).isBefore(dayjs(b.createdAt)) ? -1 : 1;
    else return dayjs(a.createdAt).isBefore(dayjs(b.createdAt)) ? 1 : -1;
  });
};


// TODO:
// - Add a description field to the task
// - Add "edit" functionality