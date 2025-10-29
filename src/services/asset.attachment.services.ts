import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AssetAttachment } from 'src/entities/asset_attachments.entity';
import { Asset } from 'src/entities/asset.entity';
import { UploadAttachmentDto } from 'src/dtos/attachment-asset.dto'

// export class UploadAttachmentDto {
//   assetId: number;
//   description?: string;
//   uploadedBy?: string;
// }

@Injectable()
export class AssetAttachmentService {
  constructor(
    @Inject('ASSET_ATTACHMENT_REPOSITORY')
    private readonly attachmentRepository: Repository<AssetAttachment>,
    @Inject('ASSET_REPOSITORY')
    private readonly assetRepository: Repository<Asset>,
  ) {}

  /**
   * Upload attachment
   */
  async uploadAttachment(
    assetId: number,
    file: Express.Multer.File,
    dto: UploadAttachmentDto
  ): Promise<any> {
    const asset = await this.assetRepository.findOne({ 
      where: { id: assetId } 
    });

    if (!asset) {
      throw new NotFoundException(`Asset with ID ${assetId} not found`);
    }

    const attachment = this.attachmentRepository.create({
      assetId,
      fileName: file.filename,
      filePath: `/uploads/attachments/${file.filename}`,
      fileType: file.mimetype,
      fileSize: file.size,
      description: dto.description,
      uploadedBy: dto.uploadedBy
    });

    const saved = await this.attachmentRepository.save(attachment);

    return {
      success: true,
      message: 'Attachment uploaded successfully',
      attachment: {
        id: saved.id,
        assetId: saved.assetId,
        fileName: saved.fileName,
        filePath: saved.filePath,
        fileType: saved.fileType,
        uploadedAt: saved.uploadedAt
      }
    };
  }

  /**
   * Get attachments for an asset
   */
  async getAttachments(assetId: number, fileType?: string): Promise<any> {
    const queryBuilder = this.attachmentRepository
      .createQueryBuilder('attachment')
      .where('attachment.assetId = :assetId', { assetId })
      .leftJoinAndSelect('attachment.asset', 'asset')
      .orderBy('attachment.uploadedAt', 'DESC');

    if (fileType) {
      queryBuilder.andWhere('attachment.fileType LIKE :fileType', { 
        fileType: `%${fileType}%` 
      });
    }

    const attachments = await queryBuilder.getMany();

    return {
      success: true,
      assetId,
      total: attachments.length,
      attachments
    };
  }

  /**
   * Get all attachments
   */
  async findAll(): Promise<AssetAttachment[]> {
    return this.attachmentRepository.find({
      relations: ['asset'],
      order: { uploadedAt: 'DESC' }
    });
  }

  /**
   * Get single attachment
   */
  async findOne(id: number): Promise<AssetAttachment> {
    const attachment = await this.attachmentRepository.findOne({ 
      where: { id },
      relations: ['asset']
    });

    if (!attachment) {
      throw new NotFoundException(`Attachment with ID ${id} not found`);
    }

    return attachment;
  }

  /**
   * Delete attachment
   */
  async remove(id: number): Promise<any> {
    const attachment = await this.attachmentRepository.findOne({ 
      where: { id } 
    });

    if (!attachment) {
      throw new NotFoundException(`Attachment with ID ${id} not found`);
    }

    await this.attachmentRepository.delete(id);

    // TODO: Also delete physical file from disk
    // const fs = require('fs');
    // fs.unlinkSync(attachment.filePath);

    return {
      success: true,
      message: 'Attachment deleted successfully'
    };
  }
}