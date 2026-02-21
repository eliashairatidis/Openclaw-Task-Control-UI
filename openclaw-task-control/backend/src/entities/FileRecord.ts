import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Task } from './Task';
import { User } from './User';

@Entity({ name: 'file_records' })
export class FileRecord {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid', name: 'task_id', nullable: true })
  taskId?: string;

  @ManyToOne(() => Task, (task: any) => task.files, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'task_id' })
  task?: Task;

  @Column({ type: 'uuid', name: 'uploader_id' })
  uploaderId!: string;

  @ManyToOne(() => User, (user: any) => user.uploads, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'uploader_id' })
  uploader?: User;

  @Column({ type: 'varchar', name: 'file_name', length: 255 })
  fileName!: string;

  @Column({ type: 'varchar', name: 'mime_type', length: 255 })
  mimeType!: string;

  @Column({ type: 'integer', name: 'size_bytes' })
  sizeBytes!: number;

  @Column({ type: 'varchar', name: 'storage_path', length: 1024 })
  storagePath!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
