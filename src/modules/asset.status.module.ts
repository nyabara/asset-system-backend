import { Module } from '@nestjs/common';
import { AssetStatusService } from 'src/services/asset.status.service';
import { DatabaseModule } from './database/database.module';
import { AssetStatusController } from 'src/controllers/asset.status.controller';

@Module({
  imports: [DatabaseModule],
  providers: [AssetStatusService],
  controllers: [AssetStatusController],
  exports: [AssetStatusService],
})
export class AssetStatusModule {}
