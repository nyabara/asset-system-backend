import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { AssetCategoryService } from 'src/services/asset.category.services';
import { AssetCategory } from 'src/entities/asset_category.entity';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: AssetCategoryService) {}

  @Get()
  findAll(): Promise<AssetCategory[]> {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<AssetCategory> {
    return this.categoryService.findOne(id);
  }

  @Post()
  create(@Body() assetCategory: Partial<AssetCategory>): Promise<AssetCategory> {
    return this.categoryService.create(assetCategory);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() assetCategory: Partial<AssetCategory>): Promise<void> {
    return this.categoryService.update(id, assetCategory);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.categoryService.remove(id);
  }
}
