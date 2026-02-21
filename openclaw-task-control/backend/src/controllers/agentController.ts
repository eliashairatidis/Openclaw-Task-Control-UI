import { Request, Response } from 'express';
import { agentLogService, agentStatusService } from '../services';

export const agentController = {
  listStatuses(_req: Request, res: Response) {
    res.json(agentStatusService.list());
  },

  updateStatus(req: Request, res: Response) {
    const status = agentStatusService.upsert(req.params.agentId as string, req.body);
    res.json(status);
  },

  listLogs(req: Request, res: Response) {
    res.json(agentLogService.listByAgent(req.params.agentId as string));
  },

  createLog(req: Request, res: Response) {
    const log = agentLogService.create({
      agentId: req.params.agentId as string,
      level: req.body.level,
      message: req.body.message,
      payload: req.body.payload,
    });

    res.status(201).json(log);
  },
};
