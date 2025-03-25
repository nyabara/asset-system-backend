import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CountyService } from 'src/services/county.service';
import { County } from 'src/entities/county.entity';

@Controller('counties')
export class CountyController {
  constructor(private readonly countyService: CountyService) {}

  @Get()
  findAll(): Promise<County[]> {
    return this.countyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<County> {
    return this.countyService.findOne(id);
  }

  @Post()
  create(@Body() county: Partial<County>): Promise<County> {
    return this.countyService.create(county);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() county: Partial<County>): Promise<void> {
    return this.countyService.update(id, county);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.countyService.remove(id);
  }
}
