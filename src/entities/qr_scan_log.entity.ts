// ========================================
// 2. QR SCAN LOG ENTITY (Track All Scans)
// ========================================

// File: src/entities/qr_scan_log.entity.ts

import { 
  Column, 
  Entity, 
  PrimaryGeneratedColumn, 
  ManyToOne, 
  JoinColumn, 
  CreateDateColumn 
} from "typeorm";
import { Asset } from "./asset.entity";

// @Entity('qr_scan_logs')
// export class QRScanLog {
//     @PrimaryGeneratedColumn()
//     id: number;

//     @Column()
//     assetId: number;

//     @ManyToOne(() => Asset)
//     @JoinColumn({ name: 'assetId' })
//     asset: Asset;

//     @Column()
//     scannedBy: string; // User who scanned

//     @Column({ type: 'text', nullable: true })
//     scanLocation: string; // GPS coordinates or location name

//     @Column({ nullable: true })
//     deviceInfo: string; // Device that scanned

//     @CreateDateColumn()
//     scannedAt: Date;

//     @Column({ default: 'success' })
//     scanResult: string; // 'success', 'failed', 'invalid'
// }

// qr_scan_log.entity.ts
@Entity('qr_scan_logs')
export class QRScanLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  assetId: number;

  @ManyToOne(() => Asset)
  @JoinColumn({ name: 'assetId' })
  asset: Asset;

  @Column()
  scannedBy: string;

  @Column({ type: 'text', nullable: true })
  scanLocation: string;

  @Column({ nullable: true })
  deviceInfo: string;

  @CreateDateColumn()
  scannedAt: Date;

  @Column({ default: 'success' })
  scanResult: string;
}