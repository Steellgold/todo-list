"use client";

import { TodoPostForm } from "$/lib/utils/types/TodoPostForm";
import { ReactElement } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "$/lib/components/forms/input";
import { TbAlertTriangle, TbCheck } from "react-icons/tb";
import { Select } from "$/lib/components/forms/select";
import { Button } from "$/lib/components/forms/button";
import { useTasksStore } from "$/lib/utils/stores/tasks.store";
import clsx from "clsx";
import { generateId } from "$/lib/utils/number.utils";

export default function Home() : ReactElement {
  const taskStore = useTasksStore();

  const { register, handleSubmit, formState: { errors } } = useForm<TodoPostForm>({
    resolver: zodResolver(TodoPostForm)
  });

  return (
    <div className="flex flex-col items-center mx-auto px-3 py-4">
      <div className="w-full rounded-lg border-2 p-4 shadow sm:max-w-xl border-gray-700 bg-gray-800 sm:p-5">
        <div className="mb-2 p-0">
          <h1 className="mb-1 text-xl font-bold text-white md:text-2xl">Tâches à faire</h1>
          <p className="text-sm font-normal text-white">
            Ici, vous pouvez ajouter des tâches à faire, les supprimer et les marquer comme terminées en cliquant sur la case à cocher.
          </p>
        </div>

        <form onSubmit={handleSubmit((data) => taskStore.addTask({
          id: generateId(),
          title: data.title,
          priority: data.priority
        }))} className="grid grid-cols-2 gap-2 sm:grid-cols-8">
          <label className="col-span-4">
            <Input placeholder="Nom de la tâche" width="large" {...register("title")} />
          </label>

          <label className="col-span-3">
            <Select width="large" options={{
              "none": "Aucune priorité",
              "small": "Priorité minimale",
              "medium": "Priorité moyenne",
              "high": "Priorité maximale"
            }} {...register("priority")} />
          </label>

          <label className="col-span-1">
            <Button type="submit" variant="primary">
              Créer
            </Button>
          </label>
        </form>

        {taskStore.completedTasks.length === 0 && (
          <p className="mt-1 text-gray-400">Vous n{"'"}avez encore complété aucune tâche. 😴</p>
        )}

        {taskStore.completedTasks.length > 0 && (
          <p className="mt-1 text-gray-400">
            Vous avez complété <strong>{taskStore.completedTasks.length} tâche(s)</strong> ! 🎉
          </p>
        )}

        {taskStore.tasks.length > 0 && (
          <div className="justify-between flex gap-2">
            <p>
              <span className="text-gray-400">
                Vous avez <strong>{taskStore.tasks.length} tâche(s)</strong> à faire<br />
                Dont <strong>{taskStore.tasks.filter((task) => task.priority === "high").length}</strong> prioritaire(s). (Priorité maximale)<br />
              </span>
            </p>

            <Button
              variant="action"
              onClick={() => taskStore.deleteAllTasks()}
              disabled={taskStore.tasks.length === 0}
            >
            Supprimer toutes les tâches
            </Button>
          </div>
        )}

        {errors.title && <p className="text-red-400 mt-1 flex gap-2 items-center">
          <TbAlertTriangle />{errors.title.message}
        </p>}

        {errors.priority && <p className="text-red-400 mt-1 flex gap-2 items-center">
          <TbAlertTriangle />{errors.priority.message}
        </p>}
      </div>

      { taskStore.tasks.length === 0 && <p className="text-gray-600 font-normal mt-4">
        Vous n{"'"}avez encore aucune tâche à faire, ajoutez-en une grâce au formulaire ci-dessus.
      </p> }

      {taskStore.tasks.map((task, index) => (
        <div key={index} className={clsx(
          "group w-full rounded-lg border-2 p-4 mt-4 sm:max-w-xl",
          "border-gray-700 bg-gray-800 hover:border-gray-600",
          "border-l-4 border-transparent hover:transition-all hover:border-l-8",
          {
            "hover:border-red-500": task.priority === "high",
            "hover:border-yellow-500": task.priority === "medium",
            "hover:border-green-500": task.priority === "small"
          }
        )}>
          <div className="grid grid-cols-8">
            <div className="col-span-7 text-sm font-normal text-gray-400">
              {task.title}
            </div>

            <div className="col-span-1 items-center mx-auto flex">
              <Button variant="action" onClick={() => taskStore.completeTask(task)}>
                <TbCheck />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}