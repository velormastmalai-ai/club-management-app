import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from './entities/audit-log.entity';

@Injectable()
export class AuditService {
  constructor(
    @InjectRepository(AuditLog)
    private auditLogRepository: Repository<AuditLog>,
  ) {}

  async log(
    actorId: string,
    actorRole: string,
    action: string,
    targetType: string,
    targetId?: string,
    detail?: Record<string, any>,
    ipAddress?: string,
    userAgent?: string,
  ): Promise<AuditLog> {
    const log = this.auditLogRepository.create({
      actorId,
      actorRole,
      action,
      targetType,
      targetId,
      detail,
      ipAddress,
      userAgent,
    });

    return this.auditLogRepository.save(log);
  }

  async findAll(limit = 100): Promise<AuditLog[]> {
    return this.auditLogRepository.find({
      take: limit,
      order: { timestamp: 'DESC' },
    });
  }

  async findByActor(actorId: string, limit = 100): Promise<AuditLog[]> {
    return this.auditLogRepository.find({
      where: { actorId },
      take: limit,
      order: { timestamp: 'DESC' },
    });
  }
}
