import express from 'express';
import healthRoutes from './routes/health.routes.js';
import errorMiddleware from './middlewares/error.middleware.js';
import authRoutes from './routes/auth.routes.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'API Novedu funcionando!'
    });
});

app.use(healthRoutes);
app.use(authRoutes)


app.use(errorMiddleware);

export default app;