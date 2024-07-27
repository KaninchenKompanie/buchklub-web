import { z } from "zod";

export const bookSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Bitte gib dem Buch einen Namen." })
    .max(100),
});
