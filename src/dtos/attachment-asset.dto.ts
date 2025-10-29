// ========================================
// ATTACHMENT DTOs
// ========================================

export class UploadAttachmentDto {
    assetId: number;
    description?: string;
    uploadedBy?: string;
    // File will be handled separately via multipart/form-data
}

export class AttachmentResponseDto {
    success: boolean;
    message: string;
    attachment?: {
        id: number;
        assetId: number;
        fileName: string;
        filePath: string;
        fileType: string;
        uploadedAt: Date;
    };
}

export class GetAttachmentsQueryDto {
    assetId: number;
    fileType?: string;
}