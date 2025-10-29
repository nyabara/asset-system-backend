import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('sub_counties')
export class SubCounty {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    subCountyName: string;

    @Column()
    countyId: number;
}