import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AssetAuditLog } from 'src/entities/asset_audit_log.entity';
import { CreateAuditLogDto } from 'src/dtos/create.audit.log.dto'


@Injectable()
export class AssetAuditLogService {
  constructor(
    @Inject('ASSET_AUDIT_LOG_REPOSITORY')
    private readonly auditLogRepository: Repository<AssetAuditLog>,
  ) {}

  /**
   * Create audit log entry
   */
  async createLog(dto: CreateAuditLogDto): Promise<AssetAuditLog> {
    const log = this.auditLogRepository.create(dto);
    return this.auditLogRepository.save(log);
  }

  /**
   * Get audit logs for a specific asset
   */
  async getAssetLogs(assetId: number): Promise<any> {
    const logs = await this.auditLogRepository.find({
      where: { assetId },
      relations: ['asset'],
      order: { timestamp: 'DESC' }
    });

    return {
      success: true,
      assetId,
      total: logs.length,
      logs
    };
  }

  /**
   * Get all audit logs with filters
   */
  async getAuditLogs(filters?: {
    assetId?: number;
    action?: string;
    performedBy?: string;
    startDate?: Date;
    endDate?: Date;
  }): Promise<any> {
    const queryBuilder = this.auditLogRepository
      .createQueryBuilder('log')
      .leftJoinAndSelect('log.asset', 'asset')
      .orderBy('log.timestamp', 'DESC');

    if (filters?.assetId) {
      queryBuilder.andWhere('log.assetId = :assetId', { assetId: filters.assetId });
    }

    if (filters?.action) {
      queryBuilder.andWhere('log.action = :action', { action: filters.action });
    }

    if (filters?.performedBy) {
      queryBuilder.andWhere('log.performedBy = :performedBy', { 
        performedBy: filters.performedBy 
      });
    }

    if (filters?.startDate && filters?.endDate) {
      queryBuilder.andWhere('log.timestamp BETWEEN :startDate AND :endDate', {
        startDate: filters.startDate,
        endDate: filters.endDate
      });
    }

    const logs = await queryBuilder.getMany();

    return {
      success: true,
      total: logs.length,
      logs
    };
  }

  /**
   * Get all logs
   */
  async findAll(): Promise<AssetAuditLog[]> {
    return this.auditLogRepository.find({
      relations: ['asset'],
      order: { timestamp: 'DESC' },
      take: 1000 // Limit to prevent overload
    });
  }

  /**
   * Get single log
   */
//   async findOne(id: number): Promise<AssetAuditLog> {
//     return this.auditLogRepository.findOne({ 
//       where: { id },
//       relations: ['asset']
//     });
//   }
async findOne(id: number): Promise<AssetAuditLog> {
  const audit = await this.auditLogRepository.findOne({
    where: { id },
    relations: ['asset'],
  });

  if (!audit) {
    throw new NotFoundException(`Audit log with ID ${id} not found`);
  }

  return audit;
}

}