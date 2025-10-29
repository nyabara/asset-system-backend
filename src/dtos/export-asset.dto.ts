// ========================================
// EXPORT DTOs
// ========================================

export class ExportAssetDto {
    assetId: number;
    format: 'PDF' | 'Excel' | 'JSON';
    includeHistory?: boolean;
    includeAttachments?: boolean;
}

export class ExportAssetResponseDto {
    success: boolean;
    message: string;
    downloadUrl?: string;
    fileName?: string;
}