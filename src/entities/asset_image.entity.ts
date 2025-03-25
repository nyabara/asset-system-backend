import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Asset } from "./asset.entity";

@Entity('asset_images')
export class AssetImage {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Asset, (asset) => asset.images)
    asset: Asset;

    @Column()
    image_url: string;
} 
