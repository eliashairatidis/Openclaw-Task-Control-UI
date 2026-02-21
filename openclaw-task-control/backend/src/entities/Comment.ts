export interface Comment {
  id: string;
  taskId: string;
  authorId: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}
