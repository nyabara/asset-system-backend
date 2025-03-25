import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AssetImage } from 'src/entities/asset_image.entity';
import { Asset } from 'src/entities/asset.entity';

@Injectable()
export class AssetImageService {
  constructor(
    @Inject('ASSET_IMAGE_REPOSITORY')
    private readonly assetImageRepository: Repository<AssetImage>,

    @Inject('ASSET_REPOSITORY')
    private readonly assetRepository: Repository<Asset>,
  ) {}

  async findAll(): Promise<AssetImage[]> {
    return this.assetImageRepository.find({ relations: ['asset'] });
  }

  async findOne(id: number): Promise<AssetImage> {
    const image = await this.assetImageRepository.findOne({ where: { id }, relations: ['asset'] });
    if (!image) {
      throw new NotFoundException(`Image with ID ${id} not found`);
    }
    return image;
  }

  async addImages(assetId: number, imageUrls: string[]): Promise<AssetImage[]> {
    const asset = await this.assetRepository.findOne({ where: { id: assetId } });
    if (!asset) {
      throw new NotFoundException(`Asset with ID ${assetId} not found`);
    }
  
    const images = imageUrls.map((url) =>
      this.assetImageRepository.create({ asset, image_url: url })
    );
  
    return this.assetImageRepository.save(images);
  }
  

  async updateImage(id: number, imageUrl: string): Promise<AssetImage> {
    const image = await this.assetImageRepository.findOne({ where: { id } });
    if (!image) {
      throw new NotFoundException(`Image with ID ${id} not found`);
    }

    image.image_url = imageUrl;
    return this.assetImageRepository.save(image);
  }

  async removeImage(id: number): Promise<void> {
    const result = await this.assetImageRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Image with ID ${id} not found`);
    }
  }
}
