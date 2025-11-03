// ========================================
// 1. QR CODE ENTITY
// ========================================

// File: src/entities/asset_qr_code.entity.ts

import { 
  Column, 
  Entity, 
  PrimaryGeneratedColumn, 
  ManyToOne, 
  JoinColumn, 
  CreateDateColumn 
} from "typeorm";
import { Asset } from "./asset.entity";

@Entity('asset_qr_codes')
export class AssetQRCode {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    assetId: number;

    @ManyToOne(() => Asset)
    @JoinColumn({ name: 'assetId' })
    asset: Asset;

    @Column({ unique: true })
    qrCodeHash: string; // Unique hash for verification

    @Column({ type: 'text' })
    qrCodeData: string; // The actual QR content

    @Column({ nullable: true })
    qrCodeUrl: string; // URL to stored QR image (optional)

    @Column({ default: true })
    isActive: boolean;

    @Column({ nullable: true })
    generatedBy: string;

    @CreateDateColumn()
    generatedAt: Date;

    @Column({ default: 0 })
    scanCount: number; // Track how many times scanned

    @Column({ type: 'timestamp', nullable: true })
    lastScannedAt: Date;
}