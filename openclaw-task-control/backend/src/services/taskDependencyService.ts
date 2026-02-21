import { TaskDependency } from '../entities';
import { createId, store } from './store';

export const taskDependencyService = {
  listByTask(taskId: string): TaskDependency[] {
    return Array.from(store.taskDependencies.values()).filter((item) => item.taskId === taskId);
  },

  create(taskId: string, dependsOnTaskId: string): TaskDependency {
    const dependency: TaskDependency = {
      id: createId(),
      taskId,
      dependsOnTaskId,
      createdAt: new Date(),
    };

    store.taskDependencies.set(dependency.id, dependency);
    return dependency;
  },

  remove(id: string): boolean {
    return store.taskDependencies.delete(id);
  },
};
