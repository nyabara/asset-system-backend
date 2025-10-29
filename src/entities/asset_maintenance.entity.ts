import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";
import { Asset } from "./asset.entity";

// ========================================
// 3. ASSET MAINTENANCE ENTITY
// ========================================
@Entity('asset_maintenance')
export class AssetMaintenance {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    assetId: number;

    @ManyToOne(() => Asset)
    @JoinColumn({ name: 'assetId' })
    asset: Asset;

    @Column()
    maintenanceType: string; // 'Preventive', 'Corrective', 'Emergency', 'Routine'

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'timestamp' })
    scheduledDate: Date;

    @Column({ type: 'timestamp', nullable: true })
    completedDate: Date;

    @Column({ default: 'Scheduled' })
    status: string; // 'Scheduled', 'In Progress', 'Completed', 'Cancelled'

    @Column({ type: 'decimal', nullable: true })
    estimatedCost: number;

    @Column({ type: 'decimal', nullable: true })
    actualCost: number;

    @Column({ nullable: true })
    performedBy: string;

    @Column({ type: 'text', nullable: true })
    notes: string;

    @CreateDateColumn()
    createdAt: Date;
}