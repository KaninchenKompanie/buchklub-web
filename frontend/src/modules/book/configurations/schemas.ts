import { z } from "zod";

export const bookSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Bitte gib den Buchtitel an." })
    .max(100, { message: "Als ob der Titel so lang ist?" }),
  author: z.string().min(1, { message: "Bitte gib den Autor an." }).max(100),
  year: z.coerce
    .number()
    .min(1500, { message: "Bitte gib ein gültiges Jahr (vierstellig) an." })
    .max(new Date().getFullYear(), {
      message: "Bitte gib kein Jahr an, das in der Zukunft liegt...",
    }),
  genre: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "Bitte wähle mindestens ein Genre.",
  }),
  description: z
    .string()
    .min(20, { message: "Bitte gib eine kurze Beschreibung an." })
    .max(10000, { message: "Bitte gib eine weniger lange Beschreibung an." }),
});
