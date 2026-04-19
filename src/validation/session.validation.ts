import { z } from "zod";

export const createSessionSchema = z.object({
  start_time: z.string().datetime(),
});

export const endSessionSchema = z
  .object({
    milk_quantity: z.coerce.number().min(0),
    notes: z.string().optional(),
  })
  .strict();