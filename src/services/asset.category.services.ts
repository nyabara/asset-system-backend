import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AssetCategory } from 'src/entities/asset_category.entity'; 

@Injectable()
export class AssetCategoryService {
  constructor(
    @Inject('ASSET_CATEGORY_REPOSITORY')
    private readonly assetCategoryRepository: Repository<AssetCategory>,
  ) {}

  async findAll(): Promise<AssetCategory[]> {
    return this.assetCategoryRepository.find();
  }

  async findOne(id: number): Promise<AssetCategory> {
    const assetCategory = await this.assetCategoryRepository.findOne({ where: { id } });
    if (!assetCategory) {
      throw new NotFoundException(`AssetCategory with ID ${id} not found`);
    }
    return assetCategory;
  }

  async create(assetCategory: Partial<AssetCategory>): Promise<AssetCategory> {
    return this.assetCategoryRepository.save(assetCategory);
  }

  async update(id: number, data: Partial<AssetCategory>): Promise<void> {
    await this.assetCategoryRepository.update(id, data);
  }

  async remove(id: number): Promise<void> {
    await this.assetCategoryRepository.delete(id);
  }
}
