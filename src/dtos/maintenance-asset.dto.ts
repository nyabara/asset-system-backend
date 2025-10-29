// ========================================
// MAINTENANCE DTOs
// ========================================

export class ScheduleMaintenanceDto {
    assetId: number;
    maintenanceType: 'Preventive' | 'Corrective' | 'Emergency' | 'Routine';
    description?: string;
    scheduledDate: Date;
    estimatedCost?: number;
    notes?: string;
    performedBy?: string;
}

export class UpdateMaintenanceDto {
    maintenanceId: number;
    status?: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
    completedDate?: Date;
    actualCost?: number;
    notes?: string;
}

export class MaintenanceResponseDto {
    success: boolean;
    message: string;
    maintenance?: {
        id: number;
        assetId: number;
        maintenanceType: string;
        scheduledDate: Date;
        status: string;
    };
}