// ========================================
// asset-attachment.controller.ts
// ========================================
import { 
  Controller, 
  Get, 
  Post, 
  Delete, 
  Param, 
  Body,
  Query,
  UseInterceptors, 
  UploadedFile,
  ParseIntPipe,
  BadRequestException
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AssetAttachmentService } from 'src/services/asset.attachment.services';
import { UploadAttachmentDto } from 'src/dtos/attachment-asset.dto'

@Controller('asset-attachments')
export class AssetAttachmentController {
  constructor(
    private readonly attachmentService: AssetAttachmentService,
  ) {}

  @Post(':assetId/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/attachments',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    })
  )
  async uploadAttachment(
    @Param('assetId', ParseIntPipe) assetId: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: UploadAttachmentDto
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    return this.attachmentService.uploadAttachment(assetId, file, dto);
  }

  @Get('asset/:assetId')
  async getAttachments(
    @Param('assetId', ParseIntPipe) assetId: number,
    @Query('fileType') fileType?: string
  ) {
    return this.attachmentService.getAttachments(assetId, fileType);
  }

  @Get()
  async findAll() {
    return this.attachmentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.attachmentService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.attachmentService.remove(id);
  }
}
