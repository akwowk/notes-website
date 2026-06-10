import { z } from "zod";

export const noteSchema = z.object({
  title: z
    .string()
    .min(3)
    .max(200),

  content: z
    .string()
    .min(1),

  published: z.boolean().default(false),
  
  tagIds: z.array(z.string()).optional(),
});

export const createNoteSchema = noteSchema;
export const updateNoteSchema = noteSchema;