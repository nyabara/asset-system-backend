import { Module } from '@nestjs/common';
import { FundSourceService } from 'src/services/asset.fundsource.services'; 
import { DatabaseModule } from './database/database.module';
import { FundSourceController } from 'src/controllers/asset.fundsource.controller'; 

@Module({
  imports: [DatabaseModule],
  providers: [FundSourceService],
  controllers: [FundSourceController],
  exports: [FundSourceService],
})
export class FundSourceModule {}
