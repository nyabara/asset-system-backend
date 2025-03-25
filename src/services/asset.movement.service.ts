import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AssetMovement } from 'src/entities/asset_movement.entity';

@Injectable()
export class AssetMovementService {
  constructor(
    @Inject('ASSET_MOVEMENT_REPOSITORY')
    private readonly assetMovementRepository: Repository<AssetMovement>,
  ) {}

  async findAll(): Promise<AssetMovement[]> {
    return this.assetMovementRepository.find({ relations: ['asset', 'from_location', 'to_location', 'moved_by'] });
  }

  async findOne(id: number): Promise<AssetMovement> {
    const assetMovement = await this.assetMovementRepository.findOne({ where: { id }, relations: ['asset', 'from_location', 'to_location', 'moved_by'] });
    if (!assetMovement){
        throw new NotFoundException(`AssetMovement with ID ${id} not found`);
    }
    return assetMovement
  }

  async create(assetMovement: Partial<AssetMovement>): Promise<AssetMovement> {
    return this.assetMovementRepository.save(assetMovement);
  }

  async update(id: number, data: Partial<AssetMovement>): Promise<void> {
    await this.assetMovementRepository.update(id, data);
  }

  async remove(id: number): Promise<void> {
    await this.assetMovementRepository.delete(id);
  }
  async delete(id: number): Promise<void> {
    const result = await this.assetMovementRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`AssetMovement with ID ${id} not found`);
    }
  }

}
