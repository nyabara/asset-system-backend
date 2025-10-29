// ========================================
// CHANGE STATUS DTOs
// ========================================

export class ChangeAssetStatusDto {
    assetId: number;
    newStatusId: number;
    newStatusName: string;
    notes?: string;
    changedBy?: string;
}

export class ChangeAssetStatusResponseDto {
    success: boolean;
    message: string;
    statusHistory?: {
        id: number;
        assetId: number;
        oldStatusName: string;
        newStatusName: string;
        changeDate: Date;
    };
}
