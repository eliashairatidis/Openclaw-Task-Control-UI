import { Router } from 'express';
import { taskController } from '../controllers/taskController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.get('/', taskController.list);
router.get('/:taskId', taskController.get);
router.post('/', authMiddleware, taskController.create);
router.patch('/:taskId', authMiddleware, taskController.update);
router.delete('/:taskId', authMiddleware, taskController.remove);
router.get('/:taskId/dependencies', taskController.listDependencies);
router.post('/:taskId/dependencies', authMiddleware, taskController.addDependency);

export default router;
