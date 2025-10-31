// import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
// import { SubCounty } from "./sub_county.entity";

// @Entity('locations')
// export class Location {
//     @PrimaryGeneratedColumn()
//     id: number;

//     @Column()
//     location_name: string;

//     @ManyToOne(() => SubCounty)
//     sub_county: SubCounty;
// }


// ========================================
// location.entity.ts
// ========================================
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { SubCounty } from "./sub_county.entity";

@Entity('locations')
export class Location {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    location_name: string;

    @Column({ nullable: true })
    subCountyId: number;  // Foreign key column

    @ManyToOne(() => SubCounty, { eager: true })
    @JoinColumn({ name: 'subCountyId' })
    sub_county: SubCounty;
}