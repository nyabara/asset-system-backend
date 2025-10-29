// ========================================
// asset-maintenance.controller.ts
// ========================================
import { Controller, Get, Post, Put, Delete, Param, Body, Query, ParseIntPipe } from '@nestjs/common';
import { AssetMaintenanceService} from 'src/services/asset-maintenance.service';
import { ScheduleMaintenanceDto, UpdateMaintenanceDto } from 'src/dtos/maintenance-asset.dto'
@Controller('asset-maintenance')
export class AssetMaintenanceController {
  constructor(
    private readonly maintenanceService: AssetMaintenanceService,
  ) {}

  @Post('schedule')
  async scheduleMaintenance(@Body() dto: ScheduleMaintenanceDto) {
    return this.maintenanceService.scheduleMaintenance(dto);
  }

  @Put(':id')
  async updateMaintenance(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateMaintenanceDto
  ) {
    return this.maintenanceService.updateMaintenance(id, dto);
  }

  @Get('asset/:assetId')
  async getAssetMaintenance(@Param('assetId', ParseIntPipe) assetId: number) {
    return this.maintenanceService.getAssetMaintenance(assetId);
  }

  @Get('upcoming')
  async getUpcomingMaintenance(@Query('days') days: number = 30) {
    return this.maintenanceService.getUpcomingMaintenance(days);
  }

  @Get()
  async findAll() {
    return this.maintenanceService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.maintenanceService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.maintenanceService.remove(id);
  }
}