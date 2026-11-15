import { z } from 'zod';

export const createUserSchema = z.object({
    body: z.object({
        name: z.string()
            .min(3)
            .max(150),

        email: z.string()
            .email()
            .max(150),

        role: z.enum(['ADMIN', 'TEACHER', 'STUDENT'])
    })
});