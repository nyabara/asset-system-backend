import { Module } from '@nestjs/common';
import { AssetService } from 'src/services/asset.service';
import { DatabaseModule } from './database/database.module';
import { AssetController } from 'src/controllers/asset.controller';
import { AssetImageService } from 'src/services/asset.image.service'; 
import { AssetImageController } from 'src/controllers/asset.image.controller';

@Module({
  imports: [DatabaseModule],
  providers: [AssetService, AssetImageService],
  controllers: [AssetController, AssetImageController],
  exports: [AssetService],
})
export class AssetModule {}
