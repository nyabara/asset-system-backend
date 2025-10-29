import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";

// ========================================
// 7. DEPARTMENTS ENTITY (if not exists)
// ========================================
@Entity('departments')
export class Department {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    departmentName: string;

    @Column({ nullable: true })
    departmentCode: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ default: true })
    isActive: boolean;
}