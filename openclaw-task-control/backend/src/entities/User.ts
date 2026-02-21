import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from '../types';
import { Comment } from './Comment';
import { FileRecord } from './FileRecord';
import { Task } from './Task';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 120 })
  name!: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email!: string;

  @Column({ type: 'varchar', name: 'password_hash' })
  passwordHash!: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role!: UserRole;

  @Column({ type: 'boolean', default: true })
  isActive!: boolean;

  @OneToMany(() => Task, (task: any) => task.creator)
  createdTasks?: Task[];

  @OneToMany(() => Task, (task: any) => task.assignee)
  assignedTasks?: Task[];

  @OneToMany(() => Comment, (comment: any) => comment.author)
  comments?: Comment[];

  @OneToMany(() => FileRecord, (fileRecord: any) => fileRecord.uploader)
  uploads?: FileRecord[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
