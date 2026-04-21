import { z } from 'zod';

export const createFuelingSchema = z.object({
  amount: z.number().positive(),
  engineHours: z.number().nonnegative().optional().nullable(),
  date: z.string().or(z.date()),
});

export const updateFuelingSchema = z.object({
  amount: z.number().positive().optional(),
  engineHours: z.number().nonnegative().optional().nullable(),
  date: z.string().or(z.date()).optional(),
});

export type CreateFuelingInput = z.infer<typeof createFuelingSchema>;
export type UpdateFuelingInput = z.infer<typeof updateFuelingSchema>;
