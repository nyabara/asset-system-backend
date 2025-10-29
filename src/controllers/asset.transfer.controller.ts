import { 
  Controller, 
  Get, 
  Post, 
  Delete, 
  Param, 
  Body,
  ParseIntPipe
} from '@nestjs/common';
import { AssetTransferService } from 'src/services/asset.transfer.services';
import { AssetTransfer } from 'src/entities/asset_transfers.entity';
import { TransferAssetDto } from 'src/dtos/transfer-asset.dto'

@Controller('asset-transfers')
export class AssetTransferController {
  constructor(
    private readonly assetTransferService: AssetTransferService,
  ) {}

  /**
   * Transfer an asset
   * POST /asset-transfers
   * 
   * Example body:
   * {
   *   "assetId": 1,
   *   "transferType": "Location",
   *   "toLocationId": 5,
   *   "notes": "Moving to warehouse",
   *   "transferredBy": "John Doe"
   * }
   */
  @Post()
  async transferAsset(@Body() dto: TransferAssetDto) {
    return this.assetTransferService.transferAsset(dto);
  }

  /**
   * Get all transfers (admin view)
   * GET /asset-transfers
   */
  @Get()
  async findAll(): Promise<AssetTransfer[]> {
    return this.assetTransferService.findAll();
  }

  /**
   * Get transfer history for a specific asset
   * GET /asset-transfers/asset/:assetId/history
   * 
   * Example: GET /asset-transfers/asset/1/history
   */
  @Get('asset/:assetId/history')
  async getTransferHistory(
    @Param('assetId', ParseIntPipe) assetId: number
  ) {
    return this.assetTransferService.getTransferHistory(assetId);
  }

  /**
   * Get transfer statistics for a specific asset
   * GET /asset-transfers/asset/:assetId/statistics
   * 
   * Example: GET /asset-transfers/asset/1/statistics
   */
  @Get('asset/:assetId/statistics')
  async getTransferStatistics(
    @Param('assetId', ParseIntPipe) assetId: number
  ) {
    return this.assetTransferService.getTransferStatistics(assetId);
  }

  /**
   * Get current holder/location for a specific asset
   * GET /asset-transfers/asset/:assetId/current-holder
   * 
   * Example: GET /asset-transfers/asset/1/current-holder
   */
  @Get('asset/:assetId/current-holder')
  async getCurrentHolder(
    @Param('assetId', ParseIntPipe) assetId: number
  ) {
    return this.assetTransferService.getCurrentHolder(assetId);
  }

  /**
   * Get single transfer by ID
   * GET /asset-transfers/:id
   * 
   * Example: GET /asset-transfers/5
   */
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number
  ): Promise<AssetTransfer> {
    return this.assetTransferService.findOne(id);
  }

  /**
   * Delete a transfer record (admin only)
   * DELETE /asset-transfers/:id
   * 
   * Example: DELETE /asset-transfers/5
   */
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.assetTransferService.remove(id);
  }
}