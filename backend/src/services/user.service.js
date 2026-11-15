import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import prisma from '../config/prisma.js';
import AppError from '../utils/AppError.js';

export async function createUser(data) {
    const existingUser = await prisma.user.findUnique({
        where: {
            email: data.email
        }
    });

    if (existingUser) {
        throw new AppError('Este e-mail já está cadastrado.', 409);
    }

    const temporaryPassword = crypto.randomBytes(12).toString('base64url');

    const hashedPassword = await bcrypt.hash(temporaryPassword, 12);

    const user = await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: hashedPassword,
            role: data.role,
            mustChangePassword: true
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            isActive: true,
            mustChangePassword: true,
            createdAt: true
        }
    });

    return {
        user,
        temporaryPassword
    };
}