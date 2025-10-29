// ========================================
// DELETE/DISPOSE ASSET DTOs
// ========================================

export class DeleteAssetDto {
    assetId: number;
    reason?: string;
    deletedBy?: string;
}

export class DisposeAssetDto {
    assetId: number;
    disposalMethod: 'Sale' | 'Donation' | 'Scrap' | 'Auction' | 'Trade-in';
    reason: string;
    disposalDate: Date;
    disposalValue?: number;
    recipientOrBuyer?: string;
    approvedBy?: string;
    notes?: string;
}

export class DeleteAssetResponseDto {
    success: boolean;
    message: string;
}