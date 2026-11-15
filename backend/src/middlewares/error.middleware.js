export default function errorMiddleware(err, req, res, next) {
    const statusCode = err.statusCode || 500;

    const isProduction = process.env.NODE_ENV === 'production';

    console.error(err);

    if (isProduction && !err.isOperational) {
        return res.status(500).json({
            status: 'error',
            message: 'Erro interno do servidor.'
        });
    }

    return res.status(statusCode).json({
        status: err.status || 'error',
        message: err.message || 'Erro interno do servidor.'
    });
}