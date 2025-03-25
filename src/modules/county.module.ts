import { Module } from '@nestjs/common';
import { CountyService } from 'src/services/county.service';
import { DatabaseModule } from './database/database.module';
import { CountyController } from 'src/controllers/county.controller';

@Module({
  imports: [DatabaseModule],
  providers: [CountyService],
  controllers: [CountyController],
  exports: [CountyService],
})
export class CountyModule {}
