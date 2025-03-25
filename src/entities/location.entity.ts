import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SubCounty } from "./sub_county.entity";

@Entity('locations')
export class Location {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    location_name: string;

    @ManyToOne(() => SubCounty)
    sub_county: SubCounty;
}