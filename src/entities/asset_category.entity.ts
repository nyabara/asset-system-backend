import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('asset_categories')
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    categoryName: string;
}