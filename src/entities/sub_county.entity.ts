// import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// @Entity('sub_counties')
// export class SubCounty {
//     @PrimaryGeneratedColumn()
//     id: number;

//     @Column({ nullable: true })
//     subCountyName: string;

//     @Column()
//     countyId: number;
// }

// ========================================
// sub_county.entity.ts
// ========================================
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { County } from "./county.entity";

@Entity('sub_counties')
export class SubCounty {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    subCountyName: string;

    @Column()
    countyId: number;  // Foreign key column

    @ManyToOne(() => County, { eager: true })
    @JoinColumn({ name: 'countyId' })
    county: County;
}