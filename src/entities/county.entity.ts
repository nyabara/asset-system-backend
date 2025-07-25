import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('counties')
export class County {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    countyName: string;
}
