import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { AgentState } from '../types';

@Entity({ name: 'agent_statuses' })
export class AgentStatus {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', name: 'agent_id', unique: true, length: 128 })
  agentId!: string;

  @Column({ type: 'enum', enum: AgentState, default: AgentState.OFFLINE })
  state!: AgentState;

  @Column({ type: 'timestamptz', name: 'last_heartbeat_at' })
  lastHeartbeatAt!: Date;

  @Column({ type: 'varchar', name: 'active_task_id', nullable: true })
  activeTaskId?: string;

  @Column({ type: 'jsonb', nullable: true })
  details?: Record<string, unknown>;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
