import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth';
import { fileService } from '../services';

export const fileController = {
  list(req: Request, res: Response) {
    const taskId = req.query.taskId as string | undefined;
    res.json(fileService.list(taskId));
  },

  create(req: AuthenticatedRequest, res: Response) {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const file = fileService.create({
      uploaderId: req.user.id,
      fileName: req.body.fileName,
      mimeType: req.body.mimeType,
      sizeBytes: req.body.sizeBytes,
      storagePath: req.body.storagePath,
      taskId: req.body.taskId,
    });

    res.status(201).json(file);
  },
};
