// ========================================
// TRANSFER ASSET DTOs
// ========================================

export class TransferAssetDto {
    assetId: number;
    transferType: 'Location' | 'User' | 'Department';
    
    // Only one of these should be provided based on transferType
    toLocationId?: number;
    toUserId?: number;
    toDepartment?: string;

    notes?: string;
    transferredBy?: string;
}

export class TransferAssetResponseDto {
    success: boolean;
    message: string;
    transfer?: {
        id: number;
        assetId: number;
        transferType: string;
        transferDate: Date;
    };
}