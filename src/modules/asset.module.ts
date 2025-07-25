import { Module } from '@nestjs/common';
import { AssetService } from 'src/services/asset.service';
import { DatabaseModule } from './database/database.module';
import { AssetController } from 'src/controllers/asset.controller';
//import { AssetImageService } from 'src/services/asset.image.service'; 


@Module({
  imports: [DatabaseModule],
  providers: [AssetService],
  controllers: [AssetController],
  exports: [AssetService],
})
export class AssetModule {}
