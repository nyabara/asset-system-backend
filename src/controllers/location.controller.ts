import { Controller, Get, Post, Put, Param, Body, Delete } from '@nestjs/common';
import { LocationService } from 'src/services/location.service';
import { Location } from 'src/entities/location.entity';

@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get()
  async getAll(): Promise<Location[]> {
    return this.locationService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: number): Promise<Location> {
    return this.locationService.findOne(id);
  }

  @Post()
  async create(@Body() locationData: Partial<Location>): Promise<Location> {
    return this.locationService.create(locationData);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() locationData: Partial<Location>): Promise<Location> {
    return this.locationService.update(id, locationData);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<{ message: string }> {
    await this.locationService.delete(id);
    return { message: 'Location deleted successfully' };
  }
}
