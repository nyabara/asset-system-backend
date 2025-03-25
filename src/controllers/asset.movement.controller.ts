import { Controller, Get, Post, Param, Body, Delete } from '@nestjs/common';
import { AssetMovementService } from 'src/services/asset.movement.service';
import { AssetMovement } from 'src/entities/asset_movement.entity';

@Controller('asset-movements')
export class AssetMovementController {
  constructor(private readonly assetMovementService: AssetMovementService) {}

  @Get()
  async getAll(): Promise<AssetMovement[]> {
    return this.assetMovementService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: number): Promise<AssetMovement> {
    return this.assetMovementService.findOne(id);
  }

  @Post()
  async create(@Body() assetMovementData: Partial<AssetMovement>): Promise<AssetMovement> {
    return this.assetMovementService.create(assetMovementData);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<{ message: string }> {
    await this.assetMovementService.delete(id);
    return { message: 'Asset movement deleted successfully' };
  }
}
