// import { Injectable, Inject, NotFoundException } from '@nestjs/common';
// import { Repository } from 'typeorm';
// import { Asset } from 'src/entities/asset.entity';

// @Injectable()
// export class AssetService {
//   constructor(
//     @Inject('ASSET_REPOSITORY')
//     private readonly assetRepository: Repository<Asset>,
//   ) {}

//   async findAll(): Promise<Asset[]> {
//     return this.assetRepository.find();
//   }

//   async findOne(id: number): Promise<Asset> {
//   const asset = await this.assetRepository.findOne({ where: { id } });

//   if (!asset) {
//     throw new NotFoundException(`Asset with ID ${id} not found`);
//   }

//   return asset;
// }


//   async create(asset: Partial<Asset>): Promise<Asset> {
//     return this.assetRepository.save(asset);
//   }

//   async update(id: number, data: Partial<Asset>): Promise<void> {
//     await this.assetRepository.update(id, data);
//   }

//   async remove(id: number): Promise<void> {
//     await this.assetRepository.delete(id);
//   }
// }

import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Asset } from 'src/entities/asset.entity';
import { AssetAttachment } from 'src/entities/asset_attachments.entity';
import { CreateAssetDto, UpdateAssetDto } from 'src/dtos/create-asset.dto';

@Injectable()
export class AssetService {
  constructor(
    @Inject('ASSET_REPOSITORY')
    private readonly assetRepository: Repository<Asset>,
    @Inject('ASSET_ATTACHMENT_REPOSITORY')
    private readonly attachmentRepository: Repository<AssetAttachment>,
  ) {}

  /**
   * Find all assets with their attachments
   */
  async findAll(): Promise<Asset[]> {
    return this.assetRepository.find({
      relations: ['attachments'],
      order: { createdAt: 'DESC' }
    });
  }

  /**
   * Find one asset with attachments
   */
  async findOne(id: number): Promise<Asset> {
    const asset = await this.assetRepository.findOne({ 
      where: { id },
      relations: ['attachments']
    });

    if (!asset) {
      throw new NotFoundException(`Asset with ID ${id} not found`);
    }

    return asset;
  }

  /**
   * Create asset with optional image attachments
   */
  async create(dto: CreateAssetDto): Promise<any> {
    // Create the asset
    const asset = this.assetRepository.create({
      ...dto,
      createdBy: dto.createdBy || 'system',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const savedAsset = await this.assetRepository.save(asset);

    // If imageUrls are provided, create attachment records
    if (dto.imageUrls && dto.imageUrls.length > 0) {
      const attachments = dto.imageUrls.map((url, index) => {
        const filename = url.split('/').pop();
        return this.attachmentRepository.create({
          assetId: savedAsset.id,
          fileName: filename || `image-${index + 1}`,
          filePath: url,
          fileType: 'image',
          fileSize: 0, // Will be updated if needed
          description: `Asset image ${index + 1}`,
          uploadedBy: dto.createdBy || 'system'
        });
      });

      await this.attachmentRepository.save(attachments);
    }

    // Return asset with attachments
    return this.findOne(savedAsset.id);
  }

  /**
   * Update asset
   */
  async update(id: number, dto: UpdateAssetDto): Promise<any> {
    const asset = await this.findOne(id);

    await this.assetRepository.update(id, {
      ...dto,
      modifiedBy: dto.modifiedBy || 'system',
      updatedAt: new Date()
    });

    return this.findOne(id);
  }

  /**
   * Delete asset and its attachments
   */
  async remove(id: number): Promise<void> {
    const asset = await this.findOne(id);

    // Delete all attachments first
    await this.attachmentRepository.delete({ assetId: id });

    // Delete the asset
    await this.assetRepository.delete(id);
  }

  /**
   * Get assets with attachments formatted for mobile app
   */
  async findAllWithAttachments(): Promise<any[]> {
    const assets = await this.findAll();

    return assets.map(asset => ({
      ...asset,
      // Combine old photo fields with new attachments
      photos: [
        ...(asset.photo1 ? [asset.photo1] : []),
        ...(asset.photo2 ? [asset.photo2] : []),
        ...(asset.photo3 ? [asset.photo3] : []),
        ...(asset.attachments?.map(a => a.filePath) || [])
      ].filter(Boolean), // Remove null/undefined
      attachmentCount: (asset.attachments?.length || 0)
    }));
  }

  /**
   * Add images to existing asset
   */
  async addImagesToAsset(
    assetId: number, 
    imageUrls: string[], 
    uploadedBy: string = 'system'
  ): Promise<any> {
    const asset = await this.findOne(assetId);

    const attachments = imageUrls.map((url, index) => {
      const filename = url.split('/').pop();
      return this.attachmentRepository.create({
        assetId: asset.id,
        fileName: filename || `image-${index + 1}`,
        filePath: url,
        fileType: 'image',
        fileSize: 0,
        description: `Additional image ${index + 1}`,
        uploadedBy
      });
    });

    await this.attachmentRepository.save(attachments);

    return this.findOne(assetId);
  }
}
