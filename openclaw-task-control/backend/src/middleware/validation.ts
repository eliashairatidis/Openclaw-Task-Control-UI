import { NextFunction, Request, Response } from 'express';

export type Validator = (body: unknown) => string | null;

export const validateBody = (validator: Validator) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const message = validator(req.body);
    if (message) {
      res.status(400).json({ message });
      return;
    }

    next();
  };
};
