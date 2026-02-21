import { Router } from 'express';
import { commentController } from '../controllers/commentController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.get('/task/:taskId', commentController.listByTask);
router.post('/', authMiddleware, commentController.create);
router.delete('/:commentId', authMiddleware, commentController.remove);

export default router;
