import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";
import { Asset } from "./asset.entity";

// ========================================
// 8. ASSET DISPOSAL ENTITY
// ========================================
@Entity('asset_disposals')
export class AssetDisposal {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    assetId: number;

    @ManyToOne(() => Asset)
    @JoinColumn({ name: 'assetId' })
    asset: Asset;

    @Column()
    disposalMethod: string; // 'Sale', 'Donation', 'Scrap', 'Auction', 'Trade-in'

    @Column({ type: 'text' })
    reason: string;

    @Column({ type: 'timestamp' })
    disposalDate: Date;

    @Column({ type: 'decimal', nullable: true })
    disposalValue: number;

    @Column({ nullable: true })
    recipientOrBuyer: string;

    @Column({ nullable: true })
    approvedBy: string;

    @Column({ type: 'text', nullable: true })
    notes: string;

    @Column({ nullable: true })
    documentPath: string; // Path to disposal approval document

    @CreateDateColumn()
    createdAt: Date;
}