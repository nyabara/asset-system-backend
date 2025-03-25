import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { AssetStatusService } from 'src/services/asset.status.service';
import { AssetStatus } from 'src/entities/asset_status.entity';

@Controller('asset-statuses')
export class AssetStatusController {
  constructor(private readonly assetStatusService: AssetStatusService) {}

  @Get()
  findAll(): Promise<AssetStatus[]> {
    return this.assetStatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<AssetStatus> {
    return this.assetStatusService.findOne(id);
  }

  @Post()
  create(@Body() assetStatus: Partial<AssetStatus>): Promise<AssetStatus> {
    return this.assetStatusService.create(assetStatus);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() assetStatus: Partial<AssetStatus>): Promise<void> {
    return this.assetStatusService.update(id, assetStatus);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.assetStatusService.remove(id);
  }
}
