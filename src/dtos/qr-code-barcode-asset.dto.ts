// ========================================
// QR CODE & BARCODE DTOs
// ========================================

export class GenerateQRCodeDto {
    assetId: number;
    size?: number; // QR code size in pixels
    format?: 'PNG' | 'SVG';
}

export class QRCodeResponseDto {
    success: boolean;
    qrCodeData: string; // Base64 encoded image or SVG string
    assetInfo: {
        id: number;
        barcode: string;
        serialNumber: string;
        description: string;
    };
}