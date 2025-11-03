import { Module } from '@nestjs/common';
import { QRCodeService } from 'src/services/qr-code.service';
import { DatabaseModule } from './database/database.module';
import { QRCodeController } from 'src/controllers/qr.code.controller'; 

@Module({
  imports: [DatabaseModule],
  providers: [QRCodeService],
  controllers: [QRCodeController],
  exports: [QRCodeService],
})
export class QRCodeModule {}
