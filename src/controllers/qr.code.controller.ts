import { Controller, Get, Post, Param, Body, ParseIntPipe } from '@nestjs/common';
import { ScanQRCodeDto } from 'src/dtos/qr-code.dto';
import { QRCodeService } from 'src/services/qr-code.service';

@Controller('qr-codes')
export class QRCodeController {
  constructor(private readonly qrCodeService: QRCodeService) {}

  @Post('generate')
  async generateQRCode(
    @Body('assetId', ParseIntPipe) assetId: number,
    @Body('generatedBy') generatedBy?: string
  ) {
    return this.qrCodeService.generateQRCode(assetId, generatedBy);
  }

  @Post('scan')
  async scanQRCode(@Body() dto: ScanQRCodeDto) {
    return this.qrCodeService.scanQRCode(dto);
  }

  @Get('asset/:assetId/scans')
  async getScanHistory(@Param('assetId', ParseIntPipe) assetId: number) {
    return this.qrCodeService.getScanHistory(assetId);
  }
}
