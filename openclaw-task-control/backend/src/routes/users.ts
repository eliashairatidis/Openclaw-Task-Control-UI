import { Router } from 'express';
import { userController } from '../controllers/userController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.get('/', authMiddleware, userController.list);
router.get('/:userId', authMiddleware, userController.get);
router.patch('/:userId', authMiddleware, userController.update);

export default router;
