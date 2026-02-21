import { Router } from 'express';
import { activityLogController } from '../controllers/activityLogController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.get('/', authMiddleware, activityLogController.list);

export default router;
