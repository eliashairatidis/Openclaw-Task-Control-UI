import { Router } from 'express';
import { authController } from '../controllers/authController';
import { validateBody } from '../middleware/validation';

const router = Router();

router.post(
  '/register',
  validateBody((body) => {
    const data = body as Record<string, unknown>;
    if (!data.email || !data.password || !data.name) {
      return 'name, email, and password are required';
    }

    return null;
  }),
  authController.register,
);

router.post('/login', authController.login);

export default router;
