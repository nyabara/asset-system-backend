import { Module } from '@nestjs/common';
import { LocationService } from 'src/services/location.service';
import { DatabaseModule } from './database/database.module';
import { LocationController } from 'src/controllers/location.controller'; 

@Module({
  imports: [DatabaseModule],
  providers: [LocationService],
  controllers: [LocationController],
  exports: [LocationService],
})
export class LocationModule {}
