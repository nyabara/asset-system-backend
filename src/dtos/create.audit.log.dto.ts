export class CreateAuditLogDto {
  assetId: number;
  action: string;
  oldValues?: string;
  newValues?: string;
  performedBy?: string;
  notes?: string;
  ipAddress?: string;
}
