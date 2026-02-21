import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth';
import { activityLogService, commentService } from '../services';
import { ActivityType } from '../types';

export const commentController = {
  listByTask(req: Request, res: Response) {
    res.json(commentService.listByTask(req.params.taskId));
  },

  create(req: AuthenticatedRequest, res: Response) {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const comment = commentService.create(req.user.id, req.body);
    activityLogService.track(ActivityType.COMMENT_CREATED, 'Comment added to task', {
      userId: req.user.id,
      taskId: comment.taskId,
      metadata: { commentId: comment.id },
    });

    res.status(201).json(comment);
  },

  remove(req: Request, res: Response) {
    if (!commentService.remove(req.params.commentId)) {
      res.status(404).json({ message: 'Comment not found' });
      return;
    }

    res.status(204).send();
  },
};
