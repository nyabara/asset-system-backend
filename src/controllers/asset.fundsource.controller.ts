import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { FundSourceService } from 'src/services/asset.fundsource.services';
import { FundSource } from 'src/entities/fund_source.entity'; 

@Controller('fund-sources')
export class FundSourceController {
  constructor(private readonly fundSourceService: FundSourceService) {}

  @Get()
  findAll(): Promise<FundSource[]> {
    return this.fundSourceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<FundSource> {
    return this.fundSourceService.findOne(id);
  }

  @Post()
  create(@Body() fundSource: Partial<FundSource>): Promise<FundSource> {
    return this.fundSourceService.create(fundSource);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() fundSource: Partial<FundSource>): Promise<void> {
    return this.fundSourceService.update(id, fundSource);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.fundSourceService.remove(id);
  }
  
}