import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AssetMaintenance } from 'src/entities/asset_maintenance.entity';
import { Asset } from 'src/entities/asset.entity';
import { ScheduleMaintenanceDto, UpdateMaintenanceDto} from 'src/dtos/maintenance-asset.dto'

// export class ScheduleMaintenanceDto {
//   assetId: number;
//   maintenanceType: 'Preventive' | 'Corrective' | 'Emergency' | 'Routine';
//   description?: string;
//   scheduledDate: Date;
//   estimatedCost?: number;
//   notes?: string;
//   performedBy?: string;
// }

// export class UpdateMaintenanceDto {
//   status?: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
//   completedDate?: Date;
//   actualCost?: number;
//   notes?: string;
// }

@Injectable()
export class AssetMaintenanceService {
  constructor(
    @Inject('ASSET_MAINTENANCE_REPOSITORY')
    private readonly maintenanceRepository: Repository<AssetMaintenance>,
    @Inject('ASSET_REPOSITORY')
    private readonly assetRepository: Repository<Asset>,
  ) {}

  /**
   * Schedule maintenance for an asset
   */
  async scheduleMaintenance(dto: ScheduleMaintenanceDto): Promise<any> {
    const asset = await this.assetRepository.findOne({ 
      where: { id: dto.assetId } 
    });

    if (!asset) {
      throw new NotFoundException(`Asset with ID ${dto.assetId} not found`);
    }

    const maintenance = this.maintenanceRepository.create({
      assetId: dto.assetId,
      maintenanceType: dto.maintenanceType,
      description: dto.description,
      scheduledDate: dto.scheduledDate,
      estimatedCost: dto.estimatedCost,
      notes: dto.notes,
      performedBy: dto.performedBy,
      status: 'Scheduled'
    });

    const saved = await this.maintenanceRepository.save(maintenance);

    return {
      success: true,
      message: 'Maintenance scheduled successfully',
      maintenance: {
        id: saved.id,
        assetId: saved.assetId,
        maintenanceType: saved.maintenanceType,
        scheduledDate: saved.scheduledDate,
        status: saved.status
      }
    };
  }

  /**
   * Update maintenance record
   */
  async updateMaintenance(id: number, dto: UpdateMaintenanceDto): Promise<any> {
    const maintenance = await this.maintenanceRepository.findOne({ 
      where: { id } 
    });

    if (!maintenance) {
      throw new NotFoundException(`Maintenance record with ID ${id} not found`);
    }

    await this.maintenanceRepository.update(id, dto);

    return {
      success: true,
      message: 'Maintenance record updated successfully'
    };
  }

  /**
   * Get maintenance records for an asset
   */
  async getAssetMaintenance(assetId: number): Promise<any> {
    const maintenanceRecords = await this.maintenanceRepository.find({
      where: { assetId },
      relations: ['asset'],
      order: { scheduledDate: 'DESC' }
    });

    return {
      success: true,
      assetId,
      total: maintenanceRecords.length,
      maintenance: maintenanceRecords
    };
  }

  /**
   * Get upcoming maintenance (next X days)
   */
  async getUpcomingMaintenance(days: number = 30): Promise<any> {
    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + days);

    const upcoming = await this.maintenanceRepository
      .createQueryBuilder('maintenance')
      .where('maintenance.scheduledDate BETWEEN :today AND :futureDate', {
        today,
        futureDate
      })
      .andWhere('maintenance.status IN (:...statuses)', {
        statuses: ['Scheduled', 'In Progress']
      })
      .leftJoinAndSelect('maintenance.asset', 'asset')
      .orderBy('maintenance.scheduledDate', 'ASC')
      .getMany();

    return {
      success: true,
      days,
      count: upcoming.length,
      maintenance: upcoming
    };
  }

  /**
   * Get all maintenance records
   */
  async findAll(): Promise<AssetMaintenance[]> {
    return this.maintenanceRepository.find({
      relations: ['asset'],
      order: { scheduledDate: 'DESC' }
    });
  }

  /**
   * Get single maintenance record
   */
  async findOne(id: number): Promise<AssetMaintenance> {
    const maintenance = await this.maintenanceRepository.findOne({ 
      where: { id },
      relations: ['asset']
    });

    if (!maintenance) {
      throw new NotFoundException(`Maintenance record with ID ${id} not found`);
    }

    return maintenance;
  }

  /**
   * Delete maintenance record
   */
  async remove(id: number): Promise<void> {
    const result = await this.maintenanceRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Maintenance record with ID ${id} not found`);
    }
  }
}