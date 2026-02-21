import { Task } from '../entities';
import { CreateTaskDto, PaginationQuery, TaskPriority, TaskStatus, UpdateTaskDto } from '../types';
import { createId, paginate, store } from './store';

export const taskService = {
  list(query: PaginationQuery = {}) {
    return paginate(Array.from(store.tasks.values()), query.page, query.pageSize);
  },

  findById(id: string): Task | undefined {
    return store.tasks.get(id);
  },

  create(creatorId: string, payload: CreateTaskDto): Task {
    const task: Task = {
      id: createId(),
      title: payload.title,
      description: payload.description,
      creatorId,
      assigneeId: payload.assigneeId,
      priority: payload.priority ?? TaskPriority.MEDIUM,
      status: payload.status ?? TaskStatus.TODO,
      dueDate: payload.dueDate ? new Date(payload.dueDate) : undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    store.tasks.set(task.id, task);
    return task;
  },

  update(id: string, payload: UpdateTaskDto): Task | undefined {
    const task = store.tasks.get(id);
    if (!task) {
      return undefined;
    }

    const nextTask: Task = {
      ...task,
      ...payload,
      dueDate: payload.dueDate ? new Date(payload.dueDate) : task.dueDate,
      updatedAt: new Date(),
    };

    store.tasks.set(id, nextTask);
    return nextTask;
  },

  remove(id: string): boolean {
    return store.tasks.delete(id);
  },
};
