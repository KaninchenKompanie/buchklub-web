import { z } from "zod";

export const bookSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Bitte gib dem Buch einen Namen." })
    .max(100),
//   author: z.string().min(1, { message: "Bitte gib den Autor an." }).max(100),
//   year: z
//     .number()
//     .min(4, { message: "Bitte gib ein gültiges Jahr an." })
//     .max(4),
//   genre: z
//     .array(z.string())
//     .max(3, { message: "Bitte wähle maximal 3 Genres." }),
//   description: z
//     .string()
//     .max(500, { message: "Bitte gib eine Beschreibung an." }),
});
