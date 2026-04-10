import { Router } from 'express';
import { home } from '../controllers/index.controller.js';
import userRoutes from './user.routes.js';
import loginRoutes from './login.routes.js';

const router = Router();

router.get('/', home);
router.use('/users', userRoutes);
router.use('/login', loginRoutes);

export default router;