import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";
import { Asset } from "./asset.entity";
import { User } from "./user.entity";
import { Location } from "./location.entity";

// ========================================
// 1. ASSET TRANSFERS ENTITY
// ========================================
@Entity('asset_transfers')
export class AssetTransfer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    assetId: number;

    @ManyToOne(() => Asset)
    @JoinColumn({ name: 'assetId' })
    asset: Asset;

    // Transfer Type: 'Location', 'User', 'Department'
    @Column()
    transferType: string;

    // From fields
    @Column({ nullable: true })
    fromLocationId: number;

    @Column({ nullable: true })
    fromUserId: number;

    @Column({ nullable: true })
    fromDepartment: string;

    // To fields
    @Column({ nullable: true })
    toLocationId: number;

    @ManyToOne(() => Location, { nullable: true })
    @JoinColumn({ name: 'toLocationId' })
    toLocation: Location;

    @Column({ nullable: true })
    toUserId: number;

    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: 'toUserId' })
    toUser: User;

    @Column({ nullable: true })
    toDepartment: string;

    // Transfer details
    @Column({ type: 'text', nullable: true })
    notes: string;

    @Column({ nullable: true })
    transferredBy: string; // User who performed the transfer

    @CreateDateColumn()
    transferDate: Date;

    @Column({ default: 'Completed' })
    status: string; // 'Pending', 'Completed', 'Cancelled'
}
