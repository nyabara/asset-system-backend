// ========================================
// asset-audit-log.controller.ts
// ========================================
import { Controller, Get, Post, Param, Body, Query, ParseIntPipe } from '@nestjs/common';
import { AssetAuditLogService } from 'src/services/asset.audit.log.services';
import { CreateAuditLogDto } from 'src/dtos/create.audit.log.dto'

@Controller('asset-audit-logs')
export class AssetAuditLogController {
  constructor(
    private readonly auditLogService: AssetAuditLogService,
  ) {}

  @Post()
  async createLog(@Body() dto: CreateAuditLogDto) {
    return this.auditLogService.createLog(dto);
  }

  @Get('asset/:assetId')
  async getAssetLogs(@Param('assetId', ParseIntPipe) assetId: number) {
    return this.auditLogService.getAssetLogs(assetId);
  }

  @Get('search')
  async getAuditLogs(
    @Query('assetId') assetId?: number,
    @Query('action') action?: string,
    @Query('performedBy') performedBy?: string
  ) {
    return this.auditLogService.getAuditLogs({ assetId, action, performedBy });
  }

  @Get()
  async findAll() {
    return this.auditLogService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.auditLogService.findOne(id);
  }
}
