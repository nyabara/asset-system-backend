// ========================================
// HISTORY & AUDIT DTOs
// ========================================

export class AssetHistoryQueryDto {
    assetId: number;
    startDate?: Date;
    endDate?: Date;
    actionType?: string; // 'Transfer', 'StatusChange', 'Maintenance', etc.
}

export class AssetHistoryResponseDto {
    success: boolean;
    transfers: Array<{
        id: number;
        transferType: string;
        fromLocation?: string;
        toLocation?: string;
        transferDate: Date;
        transferredBy: string;
    }>;
    statusChanges: Array<{
        id: number;
        oldStatus: string;
        newStatus: string;
        changeDate: Date;
        changedBy: string;
    }>;
    maintenance: Array<{
        id: number;
        maintenanceType: string;
        scheduledDate: Date;
        status: string;
    }>;
    issues: Array<{
        id: number;
        issueType: string;
        severity: string;
        status: string;
        reportedDate: Date;
    }>;
}

export class AuditLogQueryDto {
    assetId?: number;
    startDate?: Date;
    endDate?: Date;
    action?: string;
    performedBy?: string;
    limit?: number;
    offset?: number;
}

export class AuditLogResponseDto {
    success: boolean;
    total: number;
    logs: Array<{
        id: number;
        assetId: number;
        action: string;
        oldValues?: any;
        newValues?: any;
        performedBy: string;
        timestamp: Date;
    }>;
}