import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TaskPriority, TaskStatus } from '../types';
import { ActivityLog } from './ActivityLog';
import { Comment } from './Comment';
import { FileRecord } from './FileRecord';
import { TaskDependency } from './TaskDependency';
import { User } from './User';

@Entity({ name: 'tasks' })
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 200 })
  title!: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.TODO })
  status!: TaskStatus;

  @Column({ type: 'enum', enum: TaskPriority, default: TaskPriority.MEDIUM })
  priority!: TaskPriority;

  @Column({ type: 'uuid', name: 'creator_id' })
  creatorId!: string;

  @ManyToOne(() => User, (user: any) => user.createdTasks, { nullable: false })
  @JoinColumn({ name: 'creator_id' })
  creator?: User;

  @Column({ type: 'uuid', name: 'assignee_id', nullable: true })
  assigneeId?: string;

  @ManyToOne(() => User, (user: any) => user.assignedTasks, { nullable: true })
  @JoinColumn({ name: 'assignee_id' })
  assignee?: User;

  @Column({ type: 'timestamptz', name: 'due_date', nullable: true })
  dueDate?: Date;

  @OneToMany(() => Comment, (comment: any) => comment.task)
  comments?: Comment[];

  @OneToMany(() => TaskDependency, (dependency: any) => dependency.task)
  dependencies?: TaskDependency[];

  @OneToMany(() => ActivityLog, (activity: any) => activity.task)
  activityLogs?: ActivityLog[];

  @OneToMany(() => FileRecord, (fileRecord: any) => fileRecord.task)
  files?: FileRecord[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
