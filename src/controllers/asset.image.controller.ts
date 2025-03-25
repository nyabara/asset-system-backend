import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { AssetImageService } from 'src/services/asset.image.service';
import { AssetImage } from 'src/entities/asset_image.entity';

@Controller('asset-images')
export class AssetImageController {
  constructor(private readonly assetImageService: AssetImageService) {}

  @Get()
  findAll(): Promise<AssetImage[]> {
    return this.assetImageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<AssetImage> {
    return this.assetImageService.findOne(id);
  }

  @Post()
  addImages(@Body() body: { assetId: number; imageUrls: string[] }): Promise<AssetImage[]> {
    return this.assetImageService.addImages(body.assetId, body.imageUrls);
  }
  

  @Put(':id')
  updateImage(@Param('id') id: number, @Body() body: { imageUrl: string }): Promise<AssetImage> {
    return this.assetImageService.updateImage(id, body.imageUrl);
  }

  @Delete(':id')
  removeImage(@Param('id') id: number): Promise<void> {
    return this.assetImageService.removeImage(id);
  }
}
