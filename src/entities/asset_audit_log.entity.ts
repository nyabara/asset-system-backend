import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";
import { Asset } from "./asset.entity";

// ========================================
// 5. ASSET AUDIT LOG ENTITY
// ========================================
@Entity('asset_audit_log')
export class AssetAuditLog {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    assetId: number;

    @ManyToOne(() => Asset)
    @JoinColumn({ name: 'assetId' })
    asset: Asset;

    @Column()
    action: string; // 'Created', 'Updated', 'Deleted', 'Transferred', 'StatusChanged', etc.

    @Column({ type: 'text', nullable: true })
    oldValues: string; // JSON string of old values

    @Column({ type: 'text', nullable: true })
    newValues: string; // JSON string of new values

    @Column({ nullable: true })
    performedBy: string;

    @Column({ type: 'text', nullable: true })
    notes: string;

    @CreateDateColumn()
    timestamp: Date;

    @Column({ nullable: true })
    ipAddress: string;
}