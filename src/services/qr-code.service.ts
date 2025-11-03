// // ========================================
// // 4. QR CODE SERVICE
// // ========================================

// // File: src/services/qr-code.service.ts

// import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
// import { Repository } from 'typeorm';
// import { AssetQRCode } from 'src/entities/asset_qr_code.entity';
// import { QRScanLog } from 'src/entities/qr_scan_log.entity';
// import { Asset } from 'src/entities/asset.entity';
// import * as crypto from 'crypto';

// @Injectable()
// export class QRCodeService {
//   constructor(
//     @Inject('ASSET_QR_CODE_REPOSITORY')
//     private readonly qrCodeRepository: Repository<AssetQRCode>,
//     @Inject('QR_SCAN_LOG_REPOSITORY')
//     private readonly scanLogRepository: Repository<QRScanLog>,
//     @Inject('ASSET_REPOSITORY')
//     private readonly assetRepository: Repository<Asset>,
//   ) {}

//   /**
//    * Generate QR code for an asset
//    */
//   async generateQRCode(assetId: number, generatedBy?: string): Promise<any> {
//     // Verify asset exists
//     const asset = await this.assetRepository.findOne({ 
//       where: { id: assetId },
//       relations: ['status', 'category', 'fundSource']
//     });

//     if (!asset) {
//       throw new NotFoundException(`Asset with ID ${assetId} not found`);
//     }

//     // Check if QR code already exists
//     let qrCode = await this.qrCodeRepository.findOne({
//       where: { assetId, isActive: true }
//     });

//     if (!qrCode) {
//       // Build QR data
//       const qrData = this.buildQRData(asset);
//       const qrHash = this.generateHash(qrData);

//       // Create new QR code
//       qrCode = this.qrCodeRepository.create({
//         assetId,
//         qrCodeData: qrData,
//         qrCodeHash: qrHash,
//         generatedBy: generatedBy || 'system',
//         isActive: true,
//         scanCount: 0
//       });

//       qrCode = await this.qrCodeRepository.save(qrCode);
//     }

//     return {
//       success: true,
//       message: 'QR Code generated successfully',
//       qrCode: {
//         id: qrCode.id,
//         qrCodeData: qrCode.qrCodeData,
//         qrCodeHash: qrCode.qrCodeHash,
//         generatedAt: qrCode.generatedAt,
//         scanCount: qrCode.scanCount
//       },
//       asset: {
//         id: asset.id,
//         description: asset.description,
//         barcode: asset.barcode,
//         serialNumber: asset.serialNumber,
//         status: asset.status?.statusName,
//         category: asset.category?.categoryName
//       }
//     };
//   }

//   /**
//    * Scan QR code and log the scan
//    */
//   async scanQRCode(
//     qrCodeData: string, 
//     scannedBy?: string,
//     scanLocation?: string,
//     deviceInfo?: string
//   ): Promise<any> {
//     // Parse QR data
//     const parsedData = this.parseQRData(qrCodeData);
    
//     if (!parsedData) {
//       throw new BadRequestException('Invalid QR code format');
//     }

//     const { assetId } = parsedData;

//     // Get asset with all relations
//     const asset = await this.assetRepository.findOne({
//       where: { id: assetId },
//       relations: ['status', 'category', 'fundSource', 'subCounty', 'subCounty.county']
//     });

//     if (!asset) {
//       throw new NotFoundException(`Asset not found`);
//     }

//     // Get or create QR code record
//     let qrCode = await this.qrCodeRepository.findOne({
//       where: { assetId, isActive: true }
//     });

//     if (!qrCode) {
//       // Generate QR code if it doesn't exist
//       const result = await this.generateQRCode(assetId);
//       qrCode = await this.qrCodeRepository.findOne({
//         where: { assetId, isActive: true }
//       });
//     }

//     // Update scan count and last scanned time
//     await this.qrCodeRepository.update(qrCode.id, {
//       scanCount: qrCode.scanCount + 1,
//       lastScannedAt: new Date()
//     });

//     // Create scan log
//     const scanLog = this.scanLogRepository.create({
//       assetId,
//       scannedBy: scannedBy || 'anonymous',
//       scanLocation,
//       deviceInfo,
//       scanResult: 'success'
//     });

//     const savedLog = await this.scanLogRepository.save(scanLog);

//     return {
//       success: true,
//       message: 'QR Code scanned successfully',
//       asset: {
//         id: asset.id,
//         description: asset.description,
//         barcode: asset.barcode,
//         serialNumber: asset.serialNumber,
//         status: asset.status?.statusName,
//         statusId: asset.statusId,
//         category: asset.category?.categoryName,
//         fundSource: asset.fundSource?.fundSourceName,
//         location: asset.subCounty?.subCountyName,
//         county: asset.subCounty?.county?.countyName,
//         date: asset.date,
//         place: asset.place,
//         unitCost: asset.unitCost,
//         notes: asset.notes,
//         photos: [asset.photo1, asset.photo2, asset.photo3].filter(Boolean)
//       },
//       scanInfo: {
//         scanLogId: savedLog.id,
//         totalScans: qrCode.scanCount + 1,
//         lastScannedAt: new Date(),
//         qrCodeId: qrCode.id
//       }
//     };
//   }

//   /**
//    * Get QR code scan history for an asset
//    */
//   async getScanHistory(assetId: number): Promise<any> {
//     const scans = await this.scanLogRepository.find({
//       where: { assetId },
//       order: { scannedAt: 'DESC' },
//       take: 50
//     });

//     const qrCode = await this.qrCodeRepository.findOne({
//       where: { assetId, isActive: true }
//     });

//     return {
//       success: true,
//       assetId,
//       totalScans: qrCode?.scanCount || 0,
//       recentScans: scans.map(scan => ({
//         id: scan.id,
//         scannedBy: scan.scannedBy,
//         scannedAt: scan.scannedAt,
//         scanLocation: scan.scanLocation,
//         deviceInfo: scan.deviceInfo
//       }))
//     };
//   }

//   /**
//    * Get QR code statistics
//    */
//   async getQRStatistics(): Promise<any> {
//     const totalQRCodes = await this.qrCodeRepository.count({ 
//       where: { isActive: true } 
//     });
//     const totalScans = await this.scanLogRepository.count();
    
//     const mostScanned = await this.qrCodeRepository.find({
//       where: { isActive: true },
//       order: { scanCount: 'DESC' },
//       take: 10,
//       relations: ['asset']
//     });

//     return {
//       success: true,
//       statistics: {
//         totalQRCodes,
//         totalScans,
//         averageScansPerQR: totalQRCodes > 0 ? (totalScans / totalQRCodes).toFixed(2) : 0,
//         mostScannedAssets: mostScanned.map(qr => ({
//           assetId: qr.assetId,
//           description: qr.asset?.description,
//           scanCount: qr.scanCount,
//           lastScannedAt: qr.lastScannedAt
//         }))
//       }
//     };
//   }

//   // Helper methods
//   private buildQRData(asset: Asset): string {
//     return `ASSET|ID:${asset.id}|BARCODE:${asset.barcode}|DESC:${asset.description}|SERIAL:${asset.serialNumber || 'N/A'}`;
//   }

//   private generateHash(data: string): string {
//     return crypto.createHash('sha256').update(data).digest('hex');
//   }

//   private parseQRData(qrData: string): { assetId: number } | null {
//     try {
//       // Parse: "ASSET|ID:14|BARCODE:...|DESC:...|SERIAL:..."
//       const parts = qrData.split('|');
      
//       if (parts[0] !== 'ASSET') {
//         return null;
//       }

//       const idPart = parts.find(p => p.startsWith('ID:'));
//       if (!idPart) {
//         return null;
//       }

//       const assetId = parseInt(idPart.split(':')[1]);
      
//       if (isNaN(assetId)) {
//         return null;
//       }

//       return { assetId };
//     } catch (error) {
//       return null;
//     }
//   }
// }

// 4. REFACTORED QR CODE SERVICE
// ========================================

// import { Injectable, Inject, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
// import { Repository } from 'typeorm';
// import * as crypto from 'crypto';
// import { QRCodeResponseDto } from 'src/dtos/qr-code-barcode-asset.dto';
// import { ScanQRCodeDto, ScanResultDto, AssetSummaryDto } from 'src/dtos/qr-code.dto';
// import { Asset } from 'src/entities/asset.entity';
// import { AssetQRCode } from 'src/entities/asset_qr_code.entity';
// import { QRScanLog } from 'src/entities/qr_scan_log.entity';

// @Injectable()
// export class QRCodeService {
//   constructor(
//     @Inject('ASSET_QR_CODE_REPOSITORY')
//     private readonly qrCodeRepository: Repository<AssetQRCode>,
//     @Inject('QR_SCAN_LOG_REPOSITORY')
//     private readonly scanLogRepository: Repository<QRScanLog>,
//     @Inject('ASSET_REPOSITORY')
//     private readonly assetRepository: Repository<Asset>,
//   ) {}

//   /**
//    * Generate QR code data for an asset (backend generates string, not image)
//    */
//   async generateQRCode(assetId: number, generatedBy?: string): Promise<QRCodeResponseDto> {
//     try {
//       // Load asset with all relations
//       const asset = await this.assetRepository.findOne({ 
//         where: { id: assetId },
//         relations: ['status', 'category', 'fundSource', 'subCounty', 'subCounty.county', 'attachments']
//       });

//       if (!asset) {
//         throw new NotFoundException(`Asset with ID ${assetId} not found`);
//       }

//       // Check if active QR code exists
//       let qrCode = await this.qrCodeRepository.findOne({
//         where: { assetId, isActive: true }
//       });

//       if (!qrCode) {
//         // Build QR data string
//         const qrData = this.buildQRData(asset);
//         const qrHash = this.generateHash(qrData);

//         // Create new QR code record
//         qrCode = this.qrCodeRepository.create({
//           assetId,
//           qrCodeData: qrData,
//           qrCodeHash: qrHash,
//           generatedBy: generatedBy || 'system',
//           isActive: true,
//           scanCount: 0
//         });

//         qrCode = await this.qrCodeRepository.save(qrCode);
//       }

//       return {
//         success: true,
//         message: 'QR Code data generated successfully',
//         qrCodeData: qrCode.qrCodeData,
//         qrCodeHash: qrCode.qrCodeHash,
//         asset: this.mapAssetToDto(asset)
//       };
//     } catch (error) {
//       if (error instanceof NotFoundException) {
//         throw error;
//       }
//       throw new InternalServerErrorException('Failed to generate QR code');
//     }
//   }

//   /**
//    * Scan QR code and return asset details
//    */
//   async scanQRCode(dto: ScanQRCodeDto): Promise<ScanResultDto> {
//     try {
//       // Parse QR data
//       const parsedData = this.parseQRData(dto.qrCodeData);
      
//       if (!parsedData) {
//         throw new BadRequestException('Invalid QR code format');
//       }

//       const { assetId } = parsedData;

//       // Load asset with all relations
//       const asset = await this.assetRepository.findOne({
//         where: { id: assetId },
//         relations: ['status', 'category', 'fundSource', 'subCounty', 'subCounty.county', 'attachments']
//       });

//       if (!asset) {
//         // Log failed scan
//         await this.logFailedScan(assetId, dto);
//         throw new NotFoundException('Asset not found');
//       }

//       // Get or create QR code record
//       let qrCode = await this.qrCodeRepository.findOne({
//         where: { assetId, isActive: true }
//       });

//       if (!qrCode) {
//         // Auto-generate if doesn't exist
//         const result = await this.generateQRCode(assetId);
//         qrCode = await this.qrCodeRepository.findOne({
//           where: { assetId, isActive: true }
//         });
//       }

//       // Update scan statistics
//       await this.qrCodeRepository.update(qrCode.id, {
//         scanCount: qrCode.scanCount + 1,
//         lastScannedAt: new Date()
//       });

//       // Create scan log
//       const scanLog = this.scanLogRepository.create({
//         assetId,
//         scannedBy: dto.scannedBy || 'anonymous',
//         scanLocation: dto.scanLocation,
//         deviceInfo: dto.deviceInfo,
//         scanResult: 'success'
//       });

//       const savedLog = await this.scanLogRepository.save(scanLog);

//       return {
//         success: true,
//         message: 'QR Code scanned successfully',
//         asset: this.mapAssetToDto(asset),
//         scanInfo: {
//           scanLogId: savedLog.id,
//           totalScans: qrCode.scanCount + 1,
//           lastScannedAt: new Date(),
//           qrCodeId: qrCode.id
//         }
//       };
//     } catch (error) {
//       if (error instanceof BadRequestException || error instanceof NotFoundException) {
//         throw error;
//       }
//       throw new InternalServerErrorException('Failed to process QR scan');
//     }
//   }

//   /**
//    * Get scan history for an asset
//    */
//   async getScanHistory(assetId: number): Promise<any> {
//     const asset = await this.assetRepository.findOne({ where: { id: assetId } });
    
//     if (!asset) {
//       throw new NotFoundException('Asset not found');
//     }

//     const scans = await this.scanLogRepository.find({
//       where: { assetId },
//       order: { scannedAt: 'DESC' },
//       take: 50
//     });

//     const qrCode = await this.qrCodeRepository.findOne({
//       where: { assetId, isActive: true }
//     });

//     return {
//       success: true,
//       assetId,
//       totalScans: qrCode?.scanCount || 0,
//       recentScans: scans.map(scan => ({
//         id: scan.id,
//         scannedBy: scan.scannedBy,
//         scannedAt: scan.scannedAt,
//         scanLocation: scan.scanLocation,
//         deviceInfo: scan.deviceInfo,
//         scanResult: scan.scanResult
//       }))
//     };
//   }

//   // ========================================
//   // HELPER METHODS
//   // ========================================

//   /**
//    * Build QR data string (consistent format)
//    */
//   private buildQRData(asset: Asset): string {
//     return `ASSET|ID:${asset.id}|BARCODE:${asset.barcode}|DESC:${asset.description}|SERIAL:${asset.serialNumber || 'N/A'}`;
//   }

//   /**
//    * Generate hash for verification
//    */
//   private generateHash(data: string): string {
//     return crypto.createHash('sha256').update(data).digest('hex');
//   }

//   /**
//    * Parse QR data string
//    */
//   private parseQRData(qrData: string): { assetId: number } | null {
//     try {
//       const parts = qrData.split('|');
      
//       if (parts[0] !== 'ASSET') {
//         return null;
//       }

//       const idPart = parts.find(p => p.startsWith('ID:'));
//       if (!idPart) {
//         return null;
//       }

//       const assetId = parseInt(idPart.split(':')[1]);
      
//       if (isNaN(assetId)) {
//         return null;
//       }

//       return { assetId };
//     } catch (error) {
//       return null;
//     }
//   }

//   /**
//    * Map Asset entity to DTO (handles all relations safely)
//    */
//   private mapAssetToDto(asset: Asset): AssetSummaryDto {
//     // Collect all photos (legacy + attachments)
//     const photos = [
//       asset.photo1,
//       asset.photo2,
//       asset.photo3,
//       ...(asset.attachments?.map(a => a.filePath) || [])
//     ].filter(Boolean);

//     return {
//       id: asset.id,
//       description: asset.description,
//       barcode: asset.barcode,
//       serialNumber: asset.serialNumber,
//       status: asset.status?.statusName || 'Unknown',
//       statusId: asset.statusId,
//       category: asset.category?.categoryName || 'Unknown',
//       fundSource: asset.fundSource?.fundSourceName || 'Unknown',
//       location: asset.subCounty?.subCountyName || 'Unknown',
//       county: asset.subCounty?.county?.countyName || 'Unknown',
//       unitCost: asset.unitCost,
//       date: asset.date,
//       place: asset.place,
//       notes: asset.notes,
//       photos: photos,
//       latitude: asset.latitude,
//       longitude: asset.longitude
//     };
//   }

//   /**
//    * Log failed scan attempt
//    */
//   private async logFailedScan(assetId: number, dto: ScanQRCodeDto): Promise<void> {
//     try {
//       const scanLog = this.scanLogRepository.create({
//         assetId,
//         scannedBy: dto.scannedBy || 'anonymous',
//         scanLocation: dto.scanLocation,
//         deviceInfo: dto.deviceInfo,
//         scanResult: 'failed'
//       });
//       await this.scanLogRepository.save(scanLog);
//     } catch (error) {
//       // Silent fail - don't block the main error
//     }
//   }
// }

// ========================================
// FIXED QR CODE SERVICE
// File: src/services/qr-code.service.ts
// ========================================

import { Injectable, Inject, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';
import { QRCodeResponseDto, ScanQRCodeDto, ScanResultDto, AssetSummaryDto } from 'src/dtos/qr-code.dto';
import { Asset } from 'src/entities/asset.entity';
import { AssetQRCode } from 'src/entities/asset_qr_code.entity';
import { QRScanLog } from 'src/entities/qr_scan_log.entity';

@Injectable()
export class QRCodeService {
  constructor(
    @Inject('ASSET_QR_CODE_REPOSITORY')
    private readonly qrCodeRepository: Repository<AssetQRCode>,
    @Inject('QR_SCAN_LOG_REPOSITORY')
    private readonly scanLogRepository: Repository<QRScanLog>,
    @Inject('ASSET_REPOSITORY')
    private readonly assetRepository: Repository<Asset>,
  ) {}

  /**
   * Generate QR code data for an asset (backend generates string, not image)
   */
  async generateQRCode(assetId: number, generatedBy?: string): Promise<QRCodeResponseDto> {
    try {
      // Load asset with all relations
      const asset = await this.assetRepository.findOne({ 
        where: { id: assetId },
        relations: ['status', 'category', 'fundSource', 'subCounty', 'subCounty.county', 'attachments']
      });

      if (!asset) {
        throw new NotFoundException(`Asset with ID ${assetId} not found`);
      }

      // Check if active QR code exists
      let qrCode = await this.qrCodeRepository.findOne({
        where: { assetId, isActive: true }
      });

      if (!qrCode) {
        // Build QR data string
        const qrData = this.buildQRData(asset);
        const qrHash = this.generateHash(qrData);

        // Create new QR code record
        qrCode = this.qrCodeRepository.create({
          assetId,
          qrCodeData: qrData,
          qrCodeHash: qrHash,
          generatedBy: generatedBy || 'system',
          isActive: true,
          scanCount: 0
        });

        qrCode = await this.qrCodeRepository.save(qrCode);
      }

      // Now qrCode is guaranteed to be non-null
      return {
        success: true,
        message: 'QR Code data generated successfully',
        qrCodeData: qrCode.qrCodeData,
        qrCodeHash: qrCode.qrCodeHash,
        asset: this.mapAssetToDto(asset)
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to generate QR code');
    }
  }

  /**
   * Scan QR code and return asset details
   */
  async scanQRCode(dto: ScanQRCodeDto): Promise<ScanResultDto> {
    try {
      // Parse QR data
      const parsedData = this.parseQRData(dto.qrCodeData);
      
      if (!parsedData) {
        throw new BadRequestException('Invalid QR code format');
      }

      const { assetId } = parsedData;

      // Load asset with all relations
      const asset = await this.assetRepository.findOne({
        where: { id: assetId },
        relations: ['status', 'category', 'fundSource', 'subCounty', 'subCounty.county', 'attachments']
      });

      if (!asset) {
        // Log failed scan
        await this.logFailedScan(assetId, dto);
        throw new NotFoundException('Asset not found');
      }

      // Get or create QR code record
      let qrCode = await this.qrCodeRepository.findOne({
        where: { assetId, isActive: true }
      });

      if (!qrCode) {
        // Auto-generate if doesn't exist
        await this.generateQRCode(assetId);
        // Fetch again to ensure we have it
        qrCode = await this.qrCodeRepository.findOne({
          where: { assetId, isActive: true }
        });
        
        // This should never happen after generateQRCode, but TypeScript doesn't know that
        if (!qrCode) {
          throw new InternalServerErrorException('Failed to create QR code record');
        }
      }

      // Now TypeScript knows qrCode is definitely not null
      const currentScanCount = qrCode.scanCount;
      
      // Update scan statistics
      await this.qrCodeRepository.update(qrCode.id, {
        scanCount: currentScanCount + 1,
        lastScannedAt: new Date()
      });

      // Create scan log
      const scanLog = this.scanLogRepository.create({
        assetId,
        scannedBy: dto.scannedBy || 'anonymous',
        scanLocation: dto.scanLocation,
        deviceInfo: dto.deviceInfo,
        scanResult: 'success'
      });

      const savedLog = await this.scanLogRepository.save(scanLog);

      return {
        success: true,
        message: 'QR Code scanned successfully',
        asset: this.mapAssetToDto(asset),
        scanInfo: {
          scanLogId: savedLog.id,
          totalScans: currentScanCount + 1,
          lastScannedAt: new Date(),
          qrCodeId: qrCode.id
        }
      };
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to process QR scan');
    }
  }

  /**
   * Get scan history for an asset
   */
  async getScanHistory(assetId: number): Promise<any> {
    const asset = await this.assetRepository.findOne({ where: { id: assetId } });
    
    if (!asset) {
      throw new NotFoundException('Asset not found');
    }

    const scans = await this.scanLogRepository.find({
      where: { assetId },
      order: { scannedAt: 'DESC' },
      take: 50
    });

    const qrCode = await this.qrCodeRepository.findOne({
      where: { assetId, isActive: true }
    });

    return {
      success: true,
      assetId,
      totalScans: qrCode?.scanCount || 0,
      recentScans: scans.map(scan => ({
        id: scan.id,
        scannedBy: scan.scannedBy,
        scannedAt: scan.scannedAt,
        scanLocation: scan.scanLocation,
        deviceInfo: scan.deviceInfo,
        scanResult: scan.scanResult
      }))
    };
  }

  // ========================================
  // HELPER METHODS
  // ========================================

  /**
   * Build QR data string (consistent format)
   */
  private buildQRData(asset: Asset): string {
    return `ASSET|ID:${asset.id}|BARCODE:${asset.barcode}|DESC:${asset.description}|SERIAL:${asset.serialNumber || 'N/A'}`;
  }

  /**
   * Generate hash for verification
   */
  private generateHash(data: string): string {
    return crypto.createHash('sha256').update(data).digest('hex');
  }

  /**
   * Parse QR data string
   */
  private parseQRData(qrData: string): { assetId: number } | null {
    try {
      const parts = qrData.split('|');
      
      if (parts[0] !== 'ASSET') {
        return null;
      }

      const idPart = parts.find(p => p.startsWith('ID:'));
      if (!idPart) {
        return null;
      }

      const assetId = parseInt(idPart.split(':')[1]);
      
      if (isNaN(assetId)) {
        return null;
      }

      return { assetId };
    } catch (error) {
      return null;
    }
  }

  /**
   * Map Asset entity to DTO (handles all relations safely)
   */
  private mapAssetToDto(asset: Asset): AssetSummaryDto {
    // Collect all photos (legacy + attachments)
    const photos = [
      asset.photo1,
      asset.photo2,
      asset.photo3,
      ...(asset.attachments?.map(a => a.filePath) || [])
    ].filter(Boolean) as string[]; // Type assertion since filter(Boolean) removes nulls

    return {
      id: asset.id,
      description: asset.description,
      barcode: asset.barcode,
      serialNumber: asset.serialNumber || '', // Provide default for nullable field
      status: asset.status?.statusName || 'Unknown',
      statusId: asset.statusId,
      category: asset.category?.categoryName || 'Unknown',
      fundSource: asset.fundSource?.fundSourceName || 'Unknown',
      location: asset.subCounty?.subCountyName || 'Unknown',
      county: asset.subCounty?.county?.countyName || 'Unknown',
      unitCost: asset.unitCost || 0, // Provide default for nullable field
      date: asset.date || '', // Provide default for nullable field
      place: asset.place || '', // Provide default for nullable field
      notes: asset.notes || '', // Provide default for nullable field
      photos: photos,
      latitude: asset.latitude || 0, // Provide default for nullable field
      longitude: asset.longitude || 0 // Provide default for nullable field
    };
  }

  /**
   * Log failed scan attempt
   */
  private async logFailedScan(assetId: number, dto: ScanQRCodeDto): Promise<void> {
    try {
      const scanLog = this.scanLogRepository.create({
        assetId,
        scannedBy: dto.scannedBy || 'anonymous',
        scanLocation: dto.scanLocation,
        deviceInfo: dto.deviceInfo,
        scanResult: 'failed'
      });
      await this.scanLogRepository.save(scanLog);
    } catch (error) {
      // Silent fail - don't block the main error
    }
  }
}