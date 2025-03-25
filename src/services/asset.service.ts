import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Asset } from 'src/entities/asset.entity';

@Injectable()
export class AssetService {
  constructor(
    @Inject('ASSET_REPOSITORY')
    private readonly assetRepository: Repository<Asset>,
  ) {}

  async findAll(): Promise<Asset[]> {
    return this.assetRepository.find({ relations: ['status', 'location', 'fund_source', 'category', 'responsible_user', 'images'] });
  }

  async findOne(id: number): Promise<Asset> {
    const asset = await this.assetRepository.findOne({ where: { id }, relations: ['status', 'location', 'fund_source', 'category', 'responsible_user', 'images'] });
    if (!asset){
        throw new NotFoundException(`Location with ID ${id} not found`);
    }
    return asset;
  }

  async create(asset: Partial<Asset>): Promise<Asset> {
    return this.assetRepository.save(asset);
  }

  async update(id: number, data: Partial<Asset>): Promise<void> {
    await this.assetRepository.update(id, data);
  }

  async remove(id: number): Promise<void> {
    await this.assetRepository.delete(id);
  }
}
