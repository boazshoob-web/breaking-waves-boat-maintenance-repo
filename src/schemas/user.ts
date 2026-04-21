import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(1),
  password: z.string().min(4),
});

export const updateUserSchema = z.object({
  name: z.string().min(1).optional(),
  phone: z.string().min(1).optional(),
  password: z.string().min(4).optional(),
  isActive: z.boolean().optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
