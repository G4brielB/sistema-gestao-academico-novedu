import { loginUser } from '../services/auth.service.js';

export async function loginController(req, res, next) {
    try {
        const { email, password } = req.validatedData.body;

        const result = await loginUser(email, password);

        return res.status(200).json({
            status: 'success',
            message: 'Login realizado com sucesso.',
            data: result
        });
    } catch (error) {
        next(error);
    }
}