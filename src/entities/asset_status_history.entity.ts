
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";
import { Asset } from "./asset.entity";

// ========================================
// 2. ASSET STATUS HISTORY ENTITY
// ========================================
@Entity('asset_status_history')
export class AssetStatusHistory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    assetId: number;

    @ManyToOne(() => Asset)
    @JoinColumn({ name: 'assetId' })
    asset: Asset;

    @Column()
    oldStatusId: number;

    @Column()
    oldStatusName: string;

    @Column()
    newStatusId: number;

    @Column()
    newStatusName: string;

    @Column({ type: 'text', nullable: true })
    notes: string;

    @Column({ nullable: true })
    changedBy: string; // User who changed the status

    @CreateDateColumn()
    changeDate: Date;
}