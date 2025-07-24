import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { AssetService } from 'src/services/asset.service';
import { Asset } from 'src/entities/asset.entity';
import { AssetImageService } from 'src/services/asset.image.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreateAssetDto } from 'src/dtos/create-asset.dto';

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
  
  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: diskStorage({
        destination: './uploads/assets',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async createAsset(
    @Body() assetDto: CreateAssetDto,
    @UploadedFiles()
    files: Array<Express.Multer.File>,
  ) {
    // Optional: Validate file types manually here, since @UploadedFiles doesn't allow per-file pipe easily
    const invalidFiles = files.filter(
      (file) =>
        !['.jpg', '.jpeg', '.png'].includes(extname(file.originalname).toLowerCase()) ||
      file.size > 10 * 1024 * 1024 // 10MB
    );
    
    if (invalidFiles.length > 0) {
      throw new Error('Some files are invalid. Please upload only images under 10MB.');
    }
    
    const newAsset = await this.assetService.create(assetDto);
    
    if (files && files.length > 0) {
      const imageUrls = files.map(file => `/uploads/assets/${file.filename}`);
      await this.assetImageService.addImages(newAsset.id, imageUrls);
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