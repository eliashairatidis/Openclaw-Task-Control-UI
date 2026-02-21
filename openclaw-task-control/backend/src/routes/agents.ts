import { Router } from 'express';
import { agentController } from '../controllers/agentController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.get('/status', authMiddleware, agentController.listStatuses);
router.put('/:agentId/status', agentController.updateStatus);
router.get('/:agentId/logs', authMiddleware, agentController.listLogs);
router.post('/:agentId/logs', agentController.createLog);

export default router;
