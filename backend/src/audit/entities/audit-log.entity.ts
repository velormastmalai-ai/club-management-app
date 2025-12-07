import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('audit_logs')
export class AuditLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.auditLogs)
  @JoinColumn({ name: 'actor_id' })
  actor: User;

  @Column({ name: 'actor_id' })
  actorId: string;

  @Column()
  actorRole: string;

  @Column()
  action: string;

  @Column()
  targetType: string;

  @Column({ nullable: true })
  targetId: string;

  @Column({ type: 'jsonb', nullable: true })
  detail: Record<string, any>;

  @Column({ nullable: true })
  ipAddress: string;

  @Column({ nullable: true })
  userAgent: string;

  @CreateDateColumn()
  timestamp: Date;
}
