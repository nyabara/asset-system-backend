import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('fund_sources')
export class FundSource {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fundSourceName: string;
}