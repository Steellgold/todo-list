import { z } from "zod";

export const TodoPostForm = z.object({
  title: z.string()
    .min(3, "Il faut au moins trois caractère pour votre titre")
    .max(50, "Votre titre ne peut pas dépasser 50 caractères")
    .nonempty("Un titre pour votre tâche est requis"),
  priority: z.string().nonempty("La priorité de votre tâche est requise")
});

export type TodoPostForm = z.infer<typeof TodoPostForm>;