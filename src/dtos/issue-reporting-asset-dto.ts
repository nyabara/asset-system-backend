// ========================================
// ISSUE REPORTING DTOs
// ========================================

export class ReportIssueDto {
    assetId: number;
    issueType: 'Damage' | 'Malfunction' | 'Lost' | 'Theft' | 'Other';
    severity: 'Low' | 'Medium' | 'High' | 'Critical';
    description: string;
    reportedBy?: string;
}

export class UpdateIssueDto {
    issueId: number;
    status?: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
    resolution?: string;
    resolvedBy?: string;
}

export class IssueResponseDto {
    success: boolean;
    message: string;
    issue?: {
        id: number;
        assetId: number;
        issueType: string;
        severity: string;
        status: string;
        reportedDate: Date;
    };
}