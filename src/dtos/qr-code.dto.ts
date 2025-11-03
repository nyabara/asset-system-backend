// ========================================
// 3. DTOs
// ========================================

// File: src/dtos/qr-code.dto.ts

// export class GenerateQRCodeDto {
//     assetId: number;
//     generatedBy?: string;
// }

// export class ScanQRCodeDto {
//     qrCodeData: string;
//     scannedBy?: string;
//     scanLocation?: string;
//     deviceInfo?: string;
// }

// export class QRCodeResponseDto {
//     success: boolean;
//     message: string;
//     qrCode?: {
//         id: number;
//         qrCodeData: string;
//         qrCodeHash: string;
//         generatedAt: Date;
//     };
//     asset?: any;
// }

// export class ScanResultDto {
//     success: boolean;
//     message: string;
//     asset?: any;
//     scanLog?: {
//         id: number;
//         scannedAt: Date;
//         scanCount: number;
//     };
// }

export class GenerateQRCodeDto {
  assetId: number;
  generatedBy?: string;
}

export class ScanQRCodeDto {
  qrCodeData: string;
  scannedBy?: string;
  scanLocation?: string;
  deviceInfo?: string;
}

export class QRCodeResponseDto {
  success: boolean;
  message: string;
  qrCodeData?: string;
  qrCodeHash?: string;
  asset?: AssetSummaryDto;
}

export class AssetSummaryDto {
  id: number;
  description: string;
  barcode: string;
  serialNumber: string;
  status: string;
  statusId: number;
  category: string;
  fundSource: string;
  location: string;
  county: string;
  unitCost: number;
  date: string;
  place: string;
  notes: string;
  photos: string[];
  latitude: number;
  longitude: number;
}

export class ScanResultDto {
  success: boolean;
  message: string;
  asset: AssetSummaryDto;
  scanInfo: {
    scanLogId: number;
    totalScans: number;
    lastScannedAt: Date;
    qrCodeId: number;
  };
}