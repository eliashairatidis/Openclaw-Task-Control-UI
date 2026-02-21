import { Comment } from '../entities';
import { CreateCommentDto } from '../types';
import { createId, store } from './store';

export const commentService = {
  listByTask(taskId: string): Comment[] {
    return Array.from(store.comments.values()).filter((comment) => comment.taskId === taskId);
  },

  create(authorId: string, payload: CreateCommentDto): Comment {
    const comment: Comment = {
      id: createId(),
      taskId: payload.taskId,
      authorId,
      body: payload.body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    store.comments.set(comment.id, comment);
    return comment;
  },

  remove(id: string): boolean {
    return store.comments.delete(id);
  },
};
