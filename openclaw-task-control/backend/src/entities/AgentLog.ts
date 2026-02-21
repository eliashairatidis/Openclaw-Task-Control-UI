import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'agent_logs' })
export class AgentLog {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', name: 'agent_id', length: 128 })
  agentId!: string;

  @Column({
    type: 'enum',
    enum: ['debug', 'info', 'warn', 'error'],
    default: 'info',
  })
  level!: 'debug' | 'info' | 'warn' | 'error';

  @Column({ type: 'text' })
  message!: string;

  @Column({ type: 'jsonb', nullable: true })
  payload?: Record<string, unknown>;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
