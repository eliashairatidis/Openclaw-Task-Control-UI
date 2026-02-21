import { Request, Response } from 'express';
import { activityLogService, taskDependencyService, taskService } from '../services';
import { AuthenticatedRequest } from '../middleware/auth';
import { ActivityType } from '../types';

export const taskController = {
  list(req: Request, res: Response) {
    const page = Number(req.query.page ?? 1);
    const pageSize = Number(req.query.pageSize ?? 20);
    res.json(taskService.list({ page, pageSize }));
  },

  get(req: Request, res: Response) {
    const task = taskService.findById(req.params.taskId);
    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }

    res.json(task);
  },

  create(req: AuthenticatedRequest, res: Response) {
    const creatorId = req.user?.id;
    if (!creatorId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const task = taskService.create(creatorId, req.body);
    activityLogService.track(ActivityType.TASK_CREATED, `Task '${task.title}' created`, {
      userId: creatorId,
      taskId: task.id,
    });

    res.status(201).json(task);
  },

  update(req: AuthenticatedRequest, res: Response) {
    const updated = taskService.update(req.params.taskId, req.body);
    if (!updated) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }

    activityLogService.track(ActivityType.TASK_UPDATED, `Task '${updated.title}' updated`, {
      userId: req.user?.id,
      taskId: updated.id,
    });

    res.json(updated);
  },

  remove(req: Request, res: Response) {
    if (!taskService.remove(req.params.taskId)) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }

    res.status(204).send();
  },

  addDependency(req: Request, res: Response) {
    const dependency = taskDependencyService.create(req.params.taskId, req.body.dependsOnTaskId);
    res.status(201).json(dependency);
  },

  listDependencies(req: Request, res: Response) {
    res.json(taskDependencyService.listByTask(req.params.taskId));
  },
};
