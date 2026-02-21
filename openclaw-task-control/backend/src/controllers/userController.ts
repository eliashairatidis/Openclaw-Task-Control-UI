import { Request, Response } from 'express';
import { userService } from '../services';

export const userController = {
  list(req: Request, res: Response) {
    const page = Number(req.query.page ?? 1);
    const pageSize = Number(req.query.pageSize ?? 20);
    res.json(userService.list({ page, pageSize }));
  },

  get(req: Request, res: Response) {
    const user = userService.findById(req.params.userId as string);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const { passwordHash: _passwordHash, ...safeUser } = user;
    res.json(safeUser);
  },

  update(req: Request, res: Response) {
    const user = userService.update(req.params.userId as string, req.body);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const { passwordHash: _passwordHash, ...safeUser } = user;
    res.json(safeUser);
  },
};
