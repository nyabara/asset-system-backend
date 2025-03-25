import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('asset_categories')
export class AssetCategory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    category_name: string;
}