import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors, UploadedFiles, BadRequestException } from '@nestjs/common';
import { AssetService } from 'src/services/asset.service';
import { Asset } from 'src/entities/asset.entity';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreateAssetDto } from 'src/dtos/create-asset.dto';
import * as crypto from 'crypto';
import { env } from "src/common/env";


function signPayload(payload: any, secret: string): string {
  const json = JSON.stringify(payload);
  return crypto.createHmac('sha256', secret).update(json).digest('hex');
}


@Controller('assets')
export class AssetController {
  constructor(
    private readonly assetService: AssetService,
  ) {}
  
  
  @Get()
  async findAll() {
    const assets = await this.assetService.findAll();
    const signature = signPayload(assets,env.ASSET_SIGN_SECRET);
    
    return {
      data: assets,
      signature, // <-- This is the cryptographic proof
      issuedAt: new Date().toISOString() // optional but recommended
      };
    }
    
    @Get(':id')
    findOne(@Param('id') id: number): Promise<Asset> {
      return this.assetService.findOne(id);
    }
    
    @Post('upload-images')
    @UseInterceptors(
      FilesInterceptor('images', 10, {
        storage: diskStorage({
          destination: './uploads/assets',
          filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const ext = extname(file.originalname);
            cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
          },}),
        })
      )
      async uploadImages(@UploadedFiles() files: Array<Express.Multer.File>) {
        if (!files || files.length === 0) {
          throw new BadRequestException('No files uploaded.');
        }
        
        const validImages = files.filter(file =>
          
          ['.jpg', '.jpeg', '.png'].includes(extname(file.originalname).toLowerCase())
        );
        
        if (validImages.length !== files.length) {
          
          throw new BadRequestException('Some files are invalid. Only JPG, JPEG, and PNG are allowed.');
        }
        
        const oversized = validImages.filter(file => file.size > 10 * 1024 * 1024);
        
        if (oversized.length > 0) {
          throw new BadRequestException('One or more files exceed the 10MB limit.');
        }
        
        const urls = validImages.map(file => `/uploads/assets/${file.filename}`);
        return { urls };
      }
      
      @Post()
      
      async createAsset(@Body() assetDto: CreateAssetDto) {
        return this.assetService.create(assetDto);
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