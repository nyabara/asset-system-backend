import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AssetDisposal } from 'src/entities/asset_disposals.entity';
import { Asset } from 'src/entities/asset.entity';
import { DisposeAssetDto } from 'src/dtos/delete-dispose-asset.dto'



@Injectable()
export class AssetDisposalService {
  constructor(
    @Inject('ASSET_DISPOSAL_REPOSITORY')
    private readonly disposalRepository: Repository<AssetDisposal>,
    @Inject('ASSET_REPOSITORY')
    private readonly assetRepository: Repository<Asset>,
  ) {}

  /**
   * Dispose an asset
   */
  async disposeAsset(dto: DisposeAssetDto): Promise<any> {
    const asset = await this.assetRepository.findOne({ 
      where: { id: dto.assetId } 
    });

    if (!asset) {
      throw new NotFoundException(`Asset with ID ${dto.assetId} not found`);
    }

    const disposal = this.disposalRepository.create(dto);
    const saved = await this.disposalRepository.save(disposal);

    // Optionally update asset status to 'Disposed'
    // await this.assetRepository.update(dto.assetId, { statusId: DISPOSED_STATUS_ID });

    return {
      success: true,
      message: 'Asset disposed successfully',
      disposal: {
        id: saved.id,
        assetId: saved.assetId,
        disposalMethod: saved.disposalMethod,
        disposalDate: saved.disposalDate
      }
    };
  }

  /**
   * Get disposal info for an asset
   */
  async getDisposalInfo(assetId: number): Promise<any> {
    const disposal = await this.disposalRepository.findOne({
      where: { assetId },
      relations: ['asset']
    });

    if (!disposal) {
      return {
        success: true,
        message: 'No disposal record found for this asset',
        isDisposed: false
      };
    }

    return {
      success: true,
      isDisposed: true,
      disposal
    };
  }

  /**
   * Get all disposals
   */
  async findAll(): Promise<AssetDisposal[]> {
    return this.disposalRepository.find({
      relations: ['asset'],
      order: { disposalDate: 'DESC' }
    });
  }

  /**
   * Get single disposal
   */
  async findOne(id: number): Promise<AssetDisposal> {
    const disposal = await this.disposalRepository.findOne({ 
      where: { id },
      relations: ['asset']
    });

    if (!disposal) {
      throw new NotFoundException(`Disposal record with ID ${id} not found`);
    }

    return disposal;
  }

  /**
   * Delete disposal record
   */
  async remove(id: number): Promise<void> {
    const result = await this.disposalRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Disposal record with ID ${id} not found`);
    }
  }
}