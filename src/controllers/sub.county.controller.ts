import { Controller, Get, Post, Put, Param, Body, Delete } from '@nestjs/common';
import { SubCountyService } from 'src/services/sub.county.service';
import { SubCounty } from 'src/entities/sub_county.entity';

@Controller('sub-counties')
export class SubCountyController {
  constructor(private readonly subCountyService: SubCountyService) {}

  @Get()
  async getAll(): Promise<SubCounty[]> {
    return this.subCountyService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: number): Promise<SubCounty> {
    
    return this.subCountyService.findOne(id);
  }

  @Post()
  async create(@Body() subCountyData: Partial<SubCounty>): Promise<SubCounty> {
    return this.subCountyService.create(subCountyData);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() subCountyData: Partial<SubCounty>): Promise<SubCounty> {
    return this.subCountyService.update(id, subCountyData);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<{ message: string }> {
    await this.subCountyService.delete(id);
    return { message: 'SubCounty deleted successfully' };
  }
}
