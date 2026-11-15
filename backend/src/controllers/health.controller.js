import { checkDatabaseConnection } from '../services/health.service.js';
import AppError from '../utils/AppError.js';

export async function getHealth(req, res, next) {
    try {
        await checkDatabaseConnection();

        return res.status(200).json({
            status: 'ok',
            api: 'online',
            database: 'connected'
        });
    } catch (error) {
        return next(
            new AppError('Banco de dados indisponível', 503)
        );
    }
}