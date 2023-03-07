"use client";

import dayjs from "dayjs";
import { useEffect } from "react";
import { generateId } from "./number.utils";

export type Task = {
  id?: number;
  title: string;
  priority: string;
  createdAt?: string;
};

// useEffect AddTask function
export const InitTasks = (): void => {
  useEffect(() => {
    if (localStorage.getItem("tasks") === null) {
      localStorage.setItem("tasks", JSON.stringify([]));
    }
  }, []);
};

export const GetTasks = (sortBy: "asc" | "desc" = "asc"): Task[] => {
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  return tasks.sort((a: Task, b: Task) => {
    if (sortBy === "asc") return dayjs(a.createdAt).isBefore(dayjs(b.createdAt)) ? -1 : 1;
    else return dayjs(a.createdAt).isBefore(dayjs(b.createdAt)) ? 1 : -1;
  });
};

export const AddTask = (task: Task): void => {
  const tasks = GetTasks();
  tasks.push({
    id: generateId(),
    title: task.title,
    priority: task.priority,
    createdAt: dayjs().toISOString()
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
};


// TODO:
// - Add a description field to the task
// - Add "edit" functionality