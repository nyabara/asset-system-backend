// ========================================
// BULK OPERATIONS DTOs
// ========================================

export class BulkTransferDto {
    assetIds: number[];
    transferType: 'Location' | 'User' | 'Department';
    toLocationId?: number;
    toUserId?: number;
    toDepartment?: string;
    notes?: string;
    transferredBy?: string;
}

export class BulkStatusChangeDto {
    assetIds: number[];
    newStatusId: number;
    newStatusName: string;
    notes?: string;
    changedBy?: string;
}

export class BulkOperationResponseDto {
    success: boolean;
    message: string;
    processed: number;
    failed: number;
    details: Array<{
        assetId: number;
        success: boolean;
        error?: string;
    }>;
}