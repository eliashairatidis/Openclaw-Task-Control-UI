import { Router } from 'express';
import { fileController } from '../controllers/fileController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.get('/', authMiddleware, fileController.list);
router.post('/', authMiddleware, fileController.create);

export default router;
