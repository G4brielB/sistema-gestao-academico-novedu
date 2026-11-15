import { Router } from 'express';
import validate from '../middlewares/validate.middleware.js';
import { loginSchema } from '../validators/auth.validator.js';
import { loginController } from '../controllers/auth.controller.js';

const router = Router();

router.post(
    '/login',
    validate(loginSchema),
    loginController
);

export default router;