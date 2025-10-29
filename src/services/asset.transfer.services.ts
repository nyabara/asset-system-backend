import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AssetTransfer } from 'src/entities/asset_transfers.entity';
import { Asset } from 'src/entities/asset.entity';
import { TransferAssetDto } from 'src/dtos/transfer-asset.dto';

@Injectable()
export class AssetTransferService {
  constructor(
    @Inject('ASSET_TRANSFER_REPOSITORY')
    private readonly transferRepository: Repository<AssetTransfer>,
    @Inject('ASSET_REPOSITORY')
    private readonly assetRepository: Repository<Asset>,
  ) {}

  /**
   * Transfer an asset
   */
  async transferAsset(dto: TransferAssetDto): Promise<any> {
    // Verify asset exists
    const asset = await this.assetRepository.findOne({ 
      where: { id: dto.assetId } 
    });

    if (!asset) {
      throw new NotFoundException(`Asset with ID ${dto.assetId} not found`);
    }

    // Validate transfer type matches provided data
    if (dto.transferType === 'Location' && !dto.toLocationId) {
      throw new BadRequestException('toLocationId is required for Location transfer');
    }
    if (dto.transferType === 'User' && !dto.toUserId) {
      throw new BadRequestException('toUserId is required for User transfer');
    }
    if (dto.transferType === 'Department' && !dto.toDepartment) {
      throw new BadRequestException('toDepartment is required for Department transfer');
    }

    // Get current location info (from existing asset data or last transfer)
    const lastTransfer = await this.transferRepository.findOne({
      where: { assetId: dto.assetId },
      order: { transferDate: 'DESC' }
    });

    // Create new transfer record
    const transfer = this.transferRepository.create({
      assetId: dto.assetId,
      transferType: dto.transferType,
      fromLocationId: lastTransfer?.toLocationId || asset.countyId,
      fromUserId: lastTransfer?.toUserId,
      fromDepartment: lastTransfer?.toDepartment,
      toLocationId: dto.toLocationId,
      toUserId: dto.toUserId,
      toDepartment: dto.toDepartment,
      notes: dto.notes,
      transferredBy: dto.transferredBy,
      status: 'Completed'
    });

    const savedTransfer = await this.transferRepository.save(transfer);

    return {
      success: true,
      message: 'Asset transferred successfully',
      transfer: {
        id: savedTransfer.id,
        assetId: savedTransfer.assetId,
        transferType: savedTransfer.transferType,
        transferDate: savedTransfer.transferDate
      }
    };
  }

  /**
   * Get complete transfer history for an asset
   */
  async getTransferHistory(assetId: number): Promise<any> {
    const transfers = await this.transferRepository.find({
      where: { assetId },
      relations: ['toLocation', 'toUser'],
      order: { transferDate: 'DESC' }
    });

    return {
      success: true,
      totalTransfers: transfers.length,
      transfers: transfers.map((t, index) => ({
        transferNumber: transfers.length - index,
        id: t.id,
        transferType: t.transferType,
        from: {
          locationId: t.fromLocationId,
          userId: t.fromUserId,
          department: t.fromDepartment
        },
        to: {
          locationId: t.toLocationId,
          locationName: t.toLocation?.location_name,
          userId: t.toUserId,
          userName: t.toUser?.name,
          department: t.toDepartment
        },
        notes: t.notes,
        transferredBy: t.transferredBy,
        transferDate: t.transferDate,
        status: t.status
      }))
    };
  }

  /**
   * Get transfer statistics
   */
  async getTransferStatistics(assetId: number): Promise<any> {
    const transfers = await this.transferRepository.find({
      where: { assetId },
      order: { transferDate: 'ASC' }
    });

    if (transfers.length === 0) {
      return {
        success: true,
        assetId,
        totalTransfers: 0,
        message: 'No transfers recorded for this asset'
      };
    }

    const firstTransfer = transfers[0];
    const lastTransfer = transfers[transfers.length - 1];
    
    const firstDate = new Date(firstTransfer.transferDate);
    const lastDate = new Date(lastTransfer.transferDate);
    const daysBetween = Math.floor(
      (lastDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    // Count transfers by type
    const transfersByType = transfers.reduce((acc, t) => {
      acc[t.transferType] = (acc[t.transferType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Get unique locations
    const uniqueLocations = new Set(
      transfers.filter(t => t.toLocationId).map(t => t.toLocationId)
    );

    // Get unique users
    const uniqueUsers = new Set(
      transfers.filter(t => t.toUserId).map(t => t.toUserId)
    );

    return {
      success: true,
      assetId,
      statistics: {
        totalTransfers: transfers.length,
        firstTransferDate: firstTransfer.transferDate,
        lastTransferDate: lastTransfer.transferDate,
        daysSinceFirstTransfer: daysBetween,
        averageTransfersPerYear: 
          transfers.length > 0 && daysBetween > 0 
            ? (transfers.length / (daysBetween / 365)).toFixed(2)
            : '0',
        transfersByType,
        uniqueLocations: uniqueLocations.size,
        uniqueUsers: uniqueUsers.size,
        mostRecentTransferredBy: lastTransfer.transferredBy
      }
    };
  }

  /**
   * Get current holder/location
   */
  async getCurrentHolder(assetId: number): Promise<any> {
    const latestTransfer = await this.transferRepository.findOne({
      where: { assetId },
      relations: ['toLocation', 'toUser'],
      order: { transferDate: 'DESC' }
    });

    if (!latestTransfer) {
      return {
        success: true,
        message: 'No transfer history found. Asset is at original location.',
        hasBeenTransferred: false
      };
    }

    const totalTransfers = await this.transferRepository.count({ 
      where: { assetId } 
    });

    return {
      success: true,
      hasBeenTransferred: true,
      currentHolder: {
        type: latestTransfer.transferType,
        locationId: latestTransfer.toLocationId,
        locationName: latestTransfer.toLocation?.location_name,
        userId: latestTransfer.toUserId,
        userName: latestTransfer.toUser?.name,
        department: latestTransfer.toDepartment,
        since: latestTransfer.transferDate
      },
      totalTransfers
    };
  }

  /**
   * Get all transfers (for admin view)
   */
  async findAll(): Promise<AssetTransfer[]> {
    return this.transferRepository.find({
      relations: ['asset', 'toLocation', 'toUser'],
      order: { transferDate: 'DESC' }
    });
  }

  /**
   * Get a single transfer by ID
   */
  async findOne(id: number): Promise<AssetTransfer> {
    const transfer = await this.transferRepository.findOne({ 
      where: { id },
      relations: ['asset', 'toLocation', 'toUser']
    });

    if (!transfer) {
      throw new NotFoundException(`Transfer with ID ${id} not found`);
    }

    return transfer;
  }

  /**
   * Delete a transfer record (admin only)
   */
  async remove(id: number): Promise<void> {
    const result = await this.transferRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Transfer with ID ${id} not found`);
    }
  }
}