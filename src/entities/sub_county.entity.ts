import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { County } from "./county.entity";

@Entity('sub_counties')
export class SubCounty {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    sub_county_name: string;

    @ManyToOne(() => County)
    county: County;
}