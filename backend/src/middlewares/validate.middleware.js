import AppError from '../utils/AppError.js';

export default function validate(schema) {
    return (req, res, next) => {
        const result = schema.safeParse({
            body: req.body,
            params: req.params,
            query: req.query
        });

        if (!result.success) {
            const errors = result.error.issues.map((issue) => ({
                field: issue.path.join('.'),
                message: issue.message
            }));

            return next(
                new AppError('Dados inválidos.', 400)
            );
        }

        req.validatedData = result.data;

        next();
    };
}