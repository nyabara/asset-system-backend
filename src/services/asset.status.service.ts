import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AssetStatus } from 'src/entities/asset_status.entity';

@Injectable()
export class AssetStatusService {
  constructor(
    @Inject('ASSET_STATUS_REPOSITORY')
    private readonly assetStatusRepository: Repository<AssetStatus>,
  ) {}

  async findAll(): Promise<AssetStatus[]> {
    return this.assetStatusRepository.find();
  }

  async findOne(id: number): Promise<AssetStatus> {
    const assetStatus = await this.assetStatusRepository.findOne({ where: { id } });
    if (!assetStatus) {
      throw new NotFoundException(`AssetStatus with ID ${id} not found`);
    }
    return assetStatus;
  }

  async create(assetStatus: Partial<AssetStatus>): Promise<AssetStatus> {
    return this.assetStatusRepository.save(assetStatus);
  }

  async update(id: number, data: Partial<AssetStatus>): Promise<void> {
    await this.assetStatusRepository.update(id, data);
  }

  async remove(id: number): Promise<void> {
    await this.assetStatusRepository.delete(id);
  }
}
