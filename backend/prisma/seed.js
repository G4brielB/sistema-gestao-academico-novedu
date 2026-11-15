import 'dotenv/config';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const name = process.env.ADMIN_NAME;
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if (!name || !email || !password) {
        throw new Error(
            'Credenciais iniciais do administrador não configuradas.'
        );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const admin = await prisma.user.upsert({
        where: { email },
        update: {},
        create: {
            name,
            email,
            password: hashedPassword,
            role: 'ADMIN',
            isActive: true,
            mustChangePassword: true
        }
    });

    console.log(`Administrador configurado: ${admin.email}`);
}

main()
    .catch((error) => {
        console.error('Erro ao criar administrador:', error);
        process.exitCode = 1;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });