import { Module } from '@nestjs/common';
import { AssetCategoryService } from 'src/services/asset.category.services'; 
import { DatabaseModule } from './database/database.module';
import { CategoryController } from 'src/controllers/asset.category.controller'; 

@Module({
  imports: [DatabaseModule],
  providers: [AssetCategoryService],
  controllers: [CategoryController],
  exports: [AssetCategoryService],
})
export class CategoryModule {}
