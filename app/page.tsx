"use client";

import { TodoPostForm } from "$/lib/utils/types/TodoPostForm";
import { ReactElement } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "$/lib/components/forms/input";
import { TbAlertTriangle } from "react-icons/tb";
import { Select } from "$/lib/components/forms/select";
import { Button } from "$/lib/components/forms/button";

export default function Home() : ReactElement {
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

        <form onSubmit={handleSubmit((data) => console.log(data))} className="grid grid-cols-2 gap-2 sm:grid-cols-8">
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
            <Button type="submit" width="large" variant="primary">
              Créer
            </Button>
          </label>
        </form>

        {errors.title && <p className="text-red-400 mt-1 flex gap-2 items-center">
          <TbAlertTriangle />{errors.title.message}
        </p>}

        {errors.priority && <p className="text-red-400 mt-1 flex gap-2 items-center">
          <TbAlertTriangle />{errors.priority.message}
        </p>}
      </div>
    </div>
  );
}