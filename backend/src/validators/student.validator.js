import { z } from 'zod';

export const createStudentSchema = z.object({
    body: z.object({
        name: z.string()
            .min(3, 'O nome deve possuir pelo menos 3 caracteres.'),

        email: z.string()
            .email('Informe um e-mail válido.'),

        registrationNumber: z.string()
            .min(1, 'A matrícula é obrigatória.'),

        birthDate: z.string()
            .date('Informe uma data válida.')
    })
});