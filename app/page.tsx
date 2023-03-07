"use client";

import { TodoPostForm } from "$/lib/utils/types/TodoPostForm";
import { ReactElement } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "$/lib/components/forms/input";
import { TbAlertTriangle } from "react-icons/tb";
import { Select } from "$/lib/components/forms/select";
import { Button } from "$/lib/components/forms/button";
import { AddTask, GetTasks, InitTasks } from "$/lib/utils/tasks";
import { Checkbox } from "$/lib/components/forms/checkbox";
import clsx from "clsx";

export default function Home() : ReactElement {
  InitTasks();

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

        <form onSubmit={handleSubmit((data) => AddTask({
          priority: data.priority,
          title: data.title
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

        { GetTasks().length > 0 && <div className="mt-2 justify-end">
          <Button variant="action" onClick={() => {
            if (confirm("Êtes vous sûr de vouloir supprimer toutes les tâches ?")) {
              localStorage.removeItem("tasks");
              window.location.reload();
            }
          }} disabled={GetTasks().length === 0}>
            Supprimer toutes les tâches
          </Button>
        </div>
        }

        {errors.title && <p className="text-red-400 mt-1 flex gap-2 items-center">
          <TbAlertTriangle />{errors.title.message}
        </p>}

        {errors.priority && <p className="text-red-400 mt-1 flex gap-2 items-center">
          <TbAlertTriangle />{errors.priority.message}
        </p>}
      </div>

      { GetTasks().length === 0 && <p className="text-gray-600 font-normal mt-4">
        Vous n{"'"}avez encore aucune tâche à faire, ajoutez-en une grâce au formulaire ci-dessus.
      </p> }

      { GetTasks("desc").map((task, index) => (
        <div key={index} className={clsx(
          "w-full rounded-lg border-2 p-4 shadow sm:max-w-xl bg-gray-800 sm:p-5 mt-4", {
            "border-red-500": task.priority === "high",
            "border-yellow-500": task.priority === "medium",
            "border-green-500": task.priority === "small",
            "border-gray-700": task.priority ===   "none"
          }
        )}>
          <div className="flex gap-2 items-center">
            <Checkbox />
            <span className="text-white">{task.title}</span>
          </div>
        </div>
      )) }
    </div>
  );
}