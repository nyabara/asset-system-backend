import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('asset_statuses')
export class AssetStatus {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    status_name: string;
}
