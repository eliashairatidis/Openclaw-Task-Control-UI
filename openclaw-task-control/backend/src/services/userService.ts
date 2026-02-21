import crypto from 'crypto';
import { User } from '../entities';
import { CreateUserDto, PaginationQuery, UserRole } from '../types';
import { createId, paginate, store } from './store';

const hashPassword = (password: string): string =>
  crypto.createHash('sha256').update(password).digest('hex');

export const userService = {
  list(query: PaginationQuery = {}) {
    return paginate(Array.from(store.users.values()), query.page, query.pageSize);
  },

  findById(id: string): User | undefined {
    return store.users.get(id);
  },

  findByEmail(email: string): User | undefined {
    return Array.from(store.users.values()).find((user) => user.email === email);
  },

  create(payload: CreateUserDto): User {
    const user: User = {
      id: createId(),
      name: payload.name,
      email: payload.email.toLowerCase(),
      passwordHash: hashPassword(payload.password),
      role: payload.role ?? UserRole.USER,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    store.users.set(user.id, user);
    return user;
  },

  verifyPassword(user: User, password: string): boolean {
    return user.passwordHash === hashPassword(password);
  },

  update(id: string, patch: Partial<Pick<User, 'name' | 'role' | 'isActive'>>): User | undefined {
    const user = store.users.get(id);
    if (!user) {
      return undefined;
    }

    const nextUser: User = {
      ...user,
      ...patch,
      updatedAt: new Date(),
    };

    store.users.set(id, nextUser);
    return nextUser;
  },
};
