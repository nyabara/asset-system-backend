import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { AssetStatus } from "./asset_status.entity";
import { FundSource } from "./fund_source.entity";
import { AssetCategory } from "./asset_category.entity";
import { User } from "./user.entity";
import { AssetImage } from "./asset_image.entity";
import { Location } from "./location.entity";

@Entity('assets')
@Unique(['barcode'])
@Unique(['serial_number'])
export class Asset {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column()
    barcode: string;

    @Column()
    serial_number: string;

    @Column()
    item_code: string;

    @Column('decimal')
    unit_cost: number;

    @Column()
    year: number;

    @ManyToOne(() => AssetStatus)
    status: AssetStatus;

    @ManyToOne(() => Location)
    location: Location;

    @ManyToOne(() => FundSource)
    fund_source: FundSource;

    @ManyToOne(() => AssetCategory)
    category: AssetCategory;

    @ManyToOne(() => User)
    responsible_user: User;

    @Column()
    notes: string;

    @OneToMany(() => AssetImage, (image) => image.asset)
    images: AssetImage[];
}
