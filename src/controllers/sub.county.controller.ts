// import { Controller, Get, Post, Put, Param, Body, Delete } from '@nestjs/common';
// import { SubCountyService } from 'src/services/sub.county.service';
// import { SubCounty } from 'src/entities/sub_county.entity';

// @Controller('sub-counties')
// export class SubCountyController {
//   constructor(private readonly subCountyService: SubCountyService) {}

//   @Get()
//   async getAll(): Promise<SubCounty[]> {
//     return this.subCountyService.findAll();
//   }

//   @Get(':id')
//   async getOne(@Param('id') id: number): Promise<SubCounty> {
    
//     return this.subCountyService.findOne(id);
//   }

//   @Post()
//   async create(@Body() subCountyData: Partial<SubCounty>): Promise<SubCounty> {
//     return this.subCountyService.create(subCountyData);
//   }

//   @Put(':id')
//   async update(@Param('id') id: number, @Body() subCountyData: Partial<SubCounty>): Promise<SubCounty> {
//     return this.subCountyService.update(id, subCountyData);
//   }

//   @Delete(':id')
//   async delete(@Param('id') id: number): Promise<{ message: string }> {
//     await this.subCountyService.delete(id);
//     return { message: 'SubCounty deleted successfully' };
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
  Query,
  ParseIntPipe 
} from '@nestjs/common';
import { SubCountyService } from 'src/services/sub.county.service';
import { SubCounty } from 'src/entities/sub_county.entity';

@Controller('sub-counties')
export class SubCountyController {
  constructor(private readonly subCountyService: SubCountyService) {}

  /**
   * GET /sub-counties
   * Returns all sub-counties with county relation
   * Used by Android dropdown
   * 
   * Response example:
   * [
   *   {
   *     "id": 1,
   *     "subCountyName": "Bungoma East",
   *     "countyId": 1,
   *     "county": {
   *       "id": 1,
   *       "countyName": "Bungoma"
   *     }
   *   }
   * ]
   */
  @Get()
  async getAll(
    @Query('countyId') countyId?: number
  ): Promise<SubCounty[]> {
    if (countyId) {
      return this.subCountyService.findByCountyId(countyId);
    }
    return this.subCountyService.findAll();
  }

  /**
   * GET /sub-counties/:id
   * Get single sub-county with county relation
   */
  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number): Promise<SubCounty> {
    return this.subCountyService.findOne(id);
  }

  /**
   * POST /sub-counties
   * Create new sub-county
   * 
   * Request body:
   * {
   *   "subCountyName": "Bungoma East",
   *   "countyId": 1
   * }
   */
  @Post()
  async create(@Body() subCountyData: Partial<SubCounty>): Promise<SubCounty> {
    return this.subCountyService.create(subCountyData);
  }

  /**
   * PUT /sub-counties/:id
   * Update sub-county
   */
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() subCountyData: Partial<SubCounty>
  ): Promise<SubCounty> {
    return this.subCountyService.update(id, subCountyData);
  }

  /**
   * DELETE /sub-counties/:id
   * Delete sub-county
   */
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.subCountyService.delete(id);
    return { message: 'SubCounty deleted successfully' };
  }
}