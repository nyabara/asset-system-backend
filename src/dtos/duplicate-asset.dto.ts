// ========================================
// DUPLICATE ASSET DTO
// ========================================

export class DuplicateAssetDto {
    assetId: number;
    newBarcode?: string;
    newSerialNumber?: string;
    quantity?: number; // If duplicating multiple times
    duplicatedBy?: string;
}

export class DuplicateAssetResponseDto {
    success: boolean;
    message: string;
    newAssets: Array<{
        id: number;
        barcode: string;
        serialNumber: string;
    }>;
}