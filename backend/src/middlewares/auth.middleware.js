import jwt from 'jsonwebtoken';
import prisma from '../config/prisma.js';
import AppError from '../utils/AppError.js';

export default async function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(new AppError('Token não fornecido.', 401));
    }

    const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        return next(new Error('JWT_SECRET não configurado.'));
    }

    let decoded;

    try {
        decoded = jwt.verify(token, secret);
    } catch (error) {
        return next(new AppError('Token inválido ou expirado.', 401));
    }

    const user = await prisma.user.findUnique({
        where: {
            id: decoded.sub
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            isActive: true,
            mustChangePassword: true
        }
    });

    if (!user || !user.isActive) {
        return next(new AppError('Usuário não autorizado.', 401));
    }

    req.user = user;

    next();
}