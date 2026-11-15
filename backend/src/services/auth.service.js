import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../config/prisma.js';
import AppError from '../utils/AppError.js';

export async function loginUser(email, password) {
    const user = await prisma.user.findUnique({
        where: { email }
    });

    if (!user || !user.isActive) {
        throw new AppError('E-mail ou senha incorretos.', 401);
    }

    const passwordMatches = await bcrypt.compare(
        password,
        user.password
    );

    if (!passwordMatches) {
        throw new AppError('E-mail ou senha incorretos.', 401);
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new Error('JWT_SECRET não configurado.');
    }

    const token = jwt.sign(
        {
            role: user.role
        },
        secret,
        {
            subject: user.id,
            expiresIn: process.env.JWT_EXPIRES_IN || '15m'
        }
    );

    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            mustChangePassword: user.mustChangePassword
        },
        token
    };
}