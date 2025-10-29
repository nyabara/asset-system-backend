import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";
import { Asset } from "./asset.entity";

// ========================================
// 6. ASSET ATTACHMENTS ENTITY
// ========================================
@Entity('asset_attachments')
export class AssetAttachment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    assetId: number;

    @ManyToOne(() => Asset)
    @JoinColumn({ name: 'assetId' })
    asset: Asset;

    @Column()
    fileName: string;

    @Column()
    filePath: string;

    @Column()
    fileType: string; // 'document', 'image', 'pdf', etc.

    @Column({ type: 'bigint' })
    fileSize: number;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    uploadedBy: string;

    @CreateDateColumn()
    uploadedAt: Date;
}
