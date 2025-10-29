// ========================================
// asset-status-history.controller.ts
// ========================================
import { Controller, Get, Post, Param, Body, ParseIntPipe } from '@nestjs/common';
import { AssetStatusHistoryService } from 'src/services/asset.status.history.services';
import { ChangeAssetStatusDto } from 'src/dtos/change-asset-status.dto';

@Controller('asset-status-history')
export class AssetStatusHistoryController {
  constructor(
    private readonly statusHistoryService: AssetStatusHistoryService,
  ) {}

  @Post('change-status')
  async changeStatus(@Body() dto: ChangeAssetStatusDto) {
    return this.statusHistoryService.changeAssetStatus(dto);
  }

  @Get('asset/:assetId')
  async getStatusHistory(@Param('assetId', ParseIntPipe) assetId: number) {
    return this.statusHistoryService.getStatusHistory(assetId);
  }

  @Get()
  async findAll() {
    return this.statusHistoryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.statusHistoryService.findOne(id);
  }
}