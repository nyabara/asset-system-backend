// ========================================
// asset-disposal.controller.ts
// ========================================
import { Controller, Get, Post, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { AssetDisposalService } from 'src/services/asset.disposal.services';
import { DisposeAssetDto } from 'src/dtos/delete-dispose-asset.dto'

@Controller('asset-disposals')
export class AssetDisposalController {
  constructor(
    private readonly disposalService: AssetDisposalService,
  ) {}

  @Post()
  async disposeAsset(@Body() dto: DisposeAssetDto) {
    return this.disposalService.disposeAsset(dto);
  }

  @Get('asset/:assetId')
  async getDisposalInfo(@Param('assetId', ParseIntPipe) assetId: number) {
    return this.disposalService.getDisposalInfo(assetId);
  }

  @Get()
  async findAll() {
    return this.disposalService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.disposalService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.disposalService.remove(id);
  }
}
