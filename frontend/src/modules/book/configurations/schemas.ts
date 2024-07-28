import { z } from "zod";

export const bookSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Bitte gib dem Buch einen Namen." })
    .max(100),
  author: z.string().min(1, { message: "Bitte gib den Autor an." }).max(100),
  year: z.coerce
    .number()
    .min(1500, { message: "Bitte gib ein gültiges Jahr an." })
    .max(new Date().getFullYear(), { message: "Bitte gib ein gültiges Jahr an." }),
  genre: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "Bitte wähle mindestens ein Genre.",
  }),
  description: z
    .string()
    .max(10000, { message: "Bitte gib eine kurze Beschreibung an." }),
});
