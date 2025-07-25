import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { County } from "./county.entity";

@Entity('sub_counties')
export class SubCounty {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    subCountyName: string;

    @Column()
    countyId: number;
}