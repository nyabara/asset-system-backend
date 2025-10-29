import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";
import { Asset } from "./asset.entity";

// ========================================
// 4. ASSET ISSUES/REPORTS ENTITY
// ========================================
@Entity('asset_issues')
export class AssetIssue {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    assetId: number;

    @ManyToOne(() => Asset)
    @JoinColumn({ name: 'assetId' })
    asset: Asset;

    @Column()
    issueType: string; // 'Damage', 'Malfunction', 'Lost', 'Theft', 'Other'

    @Column()
    severity: string; // 'Low', 'Medium', 'High', 'Critical'

    @Column({ type: 'text' })
    description: string;

    @Column({ default: 'Open' })
    status: string; // 'Open', 'In Progress', 'Resolved', 'Closed'

    @Column({ nullable: true })
    reportedBy: string;

    @CreateDateColumn()
    reportedDate: Date;

    @Column({ type: 'timestamp', nullable: true })
    resolvedDate: Date;

    @Column({ nullable: true })
    resolvedBy: string;

    @Column({ type: 'text', nullable: true })
    resolution: string;
}