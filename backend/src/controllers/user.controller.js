import { createUser } from '../services/user.service.js';

export async function createUserController(req, res, next) {
    try {
        const result = await createUser(req.validatedData.body);

        return res.status(201).json({
            status: 'success',
            message: 'Usuário criado com sucesso.',
            data: result
        });
    } catch (error) {
        next(error);
    }
}