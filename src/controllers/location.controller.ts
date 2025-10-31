// import { Controller, Get, Post, Put, Param, Body, Delete } from '@nestjs/common';
// import { LocationService } from 'src/services/location.service';
// import { Location } from 'src/entities/location.entity';

// @Controller('locations')
// export class LocationController {
//   constructor(private readonly locationService: LocationService) {}

//   @Get()
//   async getAll(): Promise<Location[]> {
//     return this.locationService.findAll();
//   }

//   @Get(':id')
//   async getOne(@Param('id') id: number): Promise<Location> {
//     return this.locationService.findOne(id);
//   }

//   @Post()
//   async create(@Body() locationData: Partial<Location>): Promise<Location> {
//     return this.locationService.create(locationData);
//   }

//   @Put(':id')
//   async update(@Param('id') id: number, @Body() locationData: Partial<Location>): Promise<Location> {
//     return this.locationService.update(id, locationData);
//   }

//   @Delete(':id')
//   async delete(@Param('id') id: number): Promise<{ message: string }> {
//     await this.locationService.delete(id);
//     return { message: 'Location deleted successfully' };
//   }
// }
import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Param, 
  Body, 
  Delete,
  ParseIntPipe 
} from '@nestjs/common';
import { LocationService } from 'src/services/location.service';
import { Location } from 'src/entities/location.entity';
import { CreateLocationDto, UpdateLocationDto } from 'src/dtos/location.dto';

@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  /**
   * GET /locations
   * Returns all locations with sub_county and county relations
   * 
   * Response example:
   * [
   *   {
   *     "id": 1,
   *     "location_name": "Main Office",
   *     "sub_county": {
   *       "id": 5,
   *       "subCountyName": "Bungoma East",
   *       "countyId": 1,
   *       "county": {
   *         "id": 1,
   *         "countyName": "Bungoma"
   *       }
   *     }
   *   }
   * ]
   */
  @Get()
  async getAll(): Promise<Location[]> {
    return this.locationService.findAll();
  }

  /**
   * GET /locations/:id
   * Get single location with relations
   */
  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number): Promise<Location> {
    return this.locationService.findOne(id);
  }

  /**
   * POST /locations
   * Create new location
   * 
   * Request body:
   * {
   *   "location_name": "Main Office",
   *   "subCountyId": 5
   * }
   * 
   * Returns created location with relations
   */
  @Post()
  async create(@Body() dto: CreateLocationDto): Promise<Location> {
    return this.locationService.create(dto);
  }

  /**
   * PUT /locations/:id
   * Update existing location
   * 
   * Request body:
   * {
   *   "location_name": "Updated Name",
   *   "subCountyId": 6
   * }
   * 
   * Returns updated location with relations
   */
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() dto: UpdateLocationDto
  ): Promise<Location> {
    return this.locationService.update(id, dto);
  }

  /**
   * DELETE /locations/:id
   * Delete location
   */
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.locationService.delete(id);
    return { message: 'Location deleted successfully' };
  }
}