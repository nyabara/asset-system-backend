import { Module } from '@nestjs/common';
import { AssetMovementService } from 'src/services/asset.movement.service';
import { DatabaseModule } from './database/database.module';
import { AssetMovementController } from 'src/controllers/asset.movement.controller'; 

@Module({
  imports: [DatabaseModule],
  providers: [AssetMovementService],
  controllers: [AssetMovementController],
  exports: [AssetMovementService],
})
export class AssetMovementModule {}
