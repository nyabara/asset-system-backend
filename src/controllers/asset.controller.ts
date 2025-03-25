import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { AssetService } from 'src/services/asset.service';
import { Asset } from 'src/entities/asset.entity';
import { AssetImageService } from 'src/services/asset.image.service';

@Controller('assets')
export class AssetController {
  constructor(
    private readonly assetService: AssetService,
    private readonly assetImageService: AssetImageService
  ) {}

  @Get()
  findAll(): Promise<Asset[]> {
    return this.assetService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Asset> {
    return this.assetService.findOne(id);
  }

  // @Post()
  // create(@Body() asset: Partial<Asset>): Promise<Asset> {
  //   return this.assetService.create(asset);
  // }

  @Post()
async createAssetWithImages(@Body() data: { asset: Partial<Asset>; images: string[] }) {
  // Step 1: Insert Asset
  const newAsset = await this.assetService.create(data.asset);

  // Step 2: Insert Multiple Images
  if (data.images && data.images.length > 0) {
    await this.assetImageService.addImages(newAsset.id, data.images);
  }

  return newAsset;
}


  @Put(':id')
  update(@Param('id') id: number, @Body() asset: Partial<Asset>): Promise<void> {
    return this.assetService.update(id, asset);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.assetService.remove(id);
  }
}