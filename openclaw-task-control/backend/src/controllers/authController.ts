import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { userService } from '../services';
import { LoginDto } from '../types';

const JWT_SECRET = process.env.JWT_SECRET ?? 'dev-secret';
const EXPIRY_SECONDS = 60 * 60 * 8;

export const authController = {
  register(req: Request, res: Response) {
    const user = userService.create(req.body);
    const { passwordHash: _passwordHash, ...safeUser } = user;
    res.status(201).json({ user: safeUser });
  },

  login(req: Request, res: Response) {
    const user = userService.findByEmail(req.body.email.toLowerCase());
    if (!user || !userService.verifyPassword(user, req.body.password)) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, {
      expiresIn: EXPIRY_SECONDS,
    });

    res.json({ accessToken: token, tokenType: 'Bearer', expiresIn: EXPIRY_SECONDS });
  },
};
