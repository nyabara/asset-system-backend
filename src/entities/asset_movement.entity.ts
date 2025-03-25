import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Asset } from "./asset.entity";
import { User } from "./user.entity";
import { Location } from "./location.entity";

@Entity('asset_movements')
export class AssetMovement {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Asset)
    asset: Asset;

    @ManyToOne(() => Location)
    from_location: Location;

    @ManyToOne(() => Location)
    to_location: Location;

    @ManyToOne(() => User)
    moved_by: User;

    @Column()
    date_moved: Date;
}