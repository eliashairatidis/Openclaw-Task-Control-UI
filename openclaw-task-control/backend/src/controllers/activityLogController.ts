import { Request, Response } from 'express';
import { activityLogService } from '../services';

export const activityLogController = {
  list(req: Request, res: Response) {
    const page = Number(req.query.page ?? 1);
    const pageSize = Number(req.query.pageSize ?? 20);
    res.json(activityLogService.list({ page, pageSize }));
  },
};
