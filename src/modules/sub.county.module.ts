import { Module } from '@nestjs/common';
import { SubCountyService } from 'src/services/sub.county.service';
import { DatabaseModule } from './database/database.module';
import { SubCountyController } from 'src/controllers/sub.county.controller'; 

@Module({
  imports: [DatabaseModule],
  providers: [SubCountyService],
  controllers: [SubCountyController],
  exports: [SubCountyService],
})
export class SubCountyModule {}
