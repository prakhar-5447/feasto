import { z } from 'zod';

export const loginSchema = z.object({
    partnerId: z
        .string()
        .trim()
        .min(1, 'Partner ID is required'),

    password: z
        .string()
        .min(1, 'Password is required'),
});

export type LoginInput =
    z.infer<typeof loginSchema>;