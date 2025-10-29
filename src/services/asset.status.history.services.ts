import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AssetStatusHistory } from 'src/entities/asset_status_history.entity';
import { Asset } from 'src/entities/asset.entity';
import { AssetStatus } from 'src/entities/asset_status.entity';
import { ChangeAssetStatusDto } from 'src/dtos/change-asset-status.dto';

@Injectable()
export class AssetStatusHistoryService {
  constructor(
    @Inject('ASSET_STATUS_HISTORY_REPOSITORY')
    private readonly statusHistoryRepository: Repository<AssetStatusHistory>,
    @Inject('ASSET_REPOSITORY')
    private readonly assetRepository: Repository<Asset>,
    @Inject('ASSET_STATUS_REPOSITORY')
    private readonly assetStatusRepository: Repository<AssetStatus>,
  ) {}

  /**
   * Change asset status and record history
   */
  async changeAssetStatus(dto: ChangeAssetStatusDto): Promise<any> {
    // Get current asset
    const asset = await this.assetRepository.findOne({ 
      where: { id: dto.assetId } 
    });

    if (!asset) {
      throw new NotFoundException(`Asset with ID ${dto.assetId} not found`);
    }

    // Get old status name
    const oldStatus = await this.assetStatusRepository.findOne({
      where: { id: asset.statusId }
    });

    // Create status history record
    const history = this.statusHistoryRepository.create({
      assetId: dto.assetId,
      oldStatusId: asset.statusId,
      oldStatusName: oldStatus?.statusName || 'Unknown',
      newStatusId: dto.newStatusId,
      newStatusName: dto.newStatusName,
      notes: dto.notes,
      changedBy: dto.changedBy
    });

    const savedHistory = await this.statusHistoryRepository.save(history);

    // Update asset status
    await this.assetRepository.update(dto.assetId, {
      statusId: dto.newStatusId
    });

    return {
      success: true,
      message: `Asset status updated to ${dto.newStatusName}`,
      statusHistory: {
        id: savedHistory.id,
        assetId: savedHistory.assetId,
        oldStatusName: savedHistory.oldStatusName,
        newStatusName: savedHistory.newStatusName,
        changeDate: savedHistory.changeDate
      }
    };
  }

  /**
   * Get status history for an asset
   */
  async getStatusHistory(assetId: number): Promise<any> {
    const history = await this.statusHistoryRepository.find({
      where: { assetId },
      relations: ['asset'],
      order: { changeDate: 'DESC' }
    });

    return {
      success: true,
      assetId,
      totalChanges: history.length,
      history: history.map(h => ({
        id: h.id,
        oldStatus: h.oldStatusName,
        newStatus: h.newStatusName,
        notes: h.notes,
        changedBy: h.changedBy,
        changeDate: h.changeDate
      }))
    };
  }

  /**
   * Get all status changes
   */
  async findAll(): Promise<AssetStatusHistory[]> {
    return this.statusHistoryRepository.find({
      relations: ['asset'],
      order: { changeDate: 'DESC' }
    });
  }

  /**
   * Get single status history record
   */
  async findOne(id: number): Promise<AssetStatusHistory> {
    const history = await this.statusHistoryRepository.findOne({ 
      where: { id },
      relations: ['asset']
    });

    if (!history) {
      throw new NotFoundException(`Status history with ID ${id} not found`);
    }

    return history;
  }
}