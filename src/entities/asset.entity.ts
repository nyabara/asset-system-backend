// // import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

// // @Entity('assets')
// // @Unique(['barcode'])
// // @Unique(['serialNumber'])
// // export class Asset {
// //   @PrimaryGeneratedColumn()
// //   id: number;

// //   @Column()
// //   description: string;

// //   @Column()
// //   barcode: string;

// //   @Column({ nullable: true })
// //   serialNumber: string;

// //   @Column('decimal',{ nullable: true })
// //   unitCost: number;

// //   @Column()
// //   statusId: number;

// //   @Column()
// //   fundSourceId: number;

// //   @Column()
// //   categoryId: number;

// //   @Column({ nullable: true })
// //   countyId: number;

// //   @Column({ nullable: true })
// //   subCountyId: number;

// //   @Column({ nullable: true })
// //   notes: string;

// //   @Column({ nullable: true })
// //   date: string;

// //   @Column({ nullable: true })
// //   place: string;

// //   @Column({ nullable: true })
// //   photo1: string;

// //   @Column({ nullable: true })
// //   photo2: string;

// //   @Column({ nullable: true })
// //   photo3: string;

// //   @Column({ type: 'double precision', nullable: true })
// //   latitude: number;

// //   @Column({ type: 'double precision', nullable: true })
// //   longitude: number;

// //     // --- New marker field ---
// //   @Column({ type: 'double precision', nullable: true })
// //   marker: number | null; // can be a timestamp or null

// // }
// import { 
//   Column, 
//   Entity, 
//   PrimaryGeneratedColumn, 
//   Unique, 
//   CreateDateColumn, 
//   UpdateDateColumn,
//   OneToMany 
// } from "typeorm";
// import { AssetAttachment } from "./asset_attachments.entity";

// @Entity('assets')
// @Unique(['barcode'])
// @Unique(['serialNumber'])
// export class Asset {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   description: string;

//   @Column()
//   barcode: string;

//   @Column({ nullable: true })
//   serialNumber: string;

//   @Column('decimal', { nullable: true })
//   unitCost: number;

//   @Column()
//   statusId: number;

//   @Column()
//   fundSourceId: number;

//   @Column()
//   categoryId: number;

//   @Column({ nullable: true })
//   countyId: number;

//   @Column({ nullable: true })
//   subCountyId: number;

//   @Column({ type: 'text', nullable: true })
//   notes: string;

//   @Column({ nullable: true })
//   date: string;

//   @Column({ nullable: true })
//   place: string;

//   // ========== KEEP OLD PHOTO FIELDS FOR BACKWARD COMPATIBILITY ==========
//   // These will be deprecated but kept to avoid breaking existing data
//   @Column({ nullable: true })
//   photo1: string;

//   @Column({ nullable: true })
//   photo2: string;

//   @Column({ nullable: true })
//   photo3: string;

//   @Column({ type: 'double precision', nullable: true })
//   latitude: number;

//   @Column({ type: 'double precision', nullable: true })
//   longitude: number;

//   @Column({ type: 'double precision', nullable: true })
//   marker: number | null;

//   // ========== NEW AUDIT FIELDS ==========
//   @Column({ nullable: true })
//   createdBy: string; // Username or user ID who created the asset

//   @Column({ nullable: true })
//   modifiedBy: string; // Username or user ID who last modified the asset

//   @CreateDateColumn()
//   createdAt: Date; // Automatically set on creation

//   @UpdateDateColumn()
//   updatedAt: Date; // Automatically updated on modification

//   // ========== NEW RELATION TO ATTACHMENTS ==========
//   // This allows you to load attachments with the asset
//   @OneToMany(() => AssetAttachment, (attachment) => attachment.asset)
//   attachments: AssetAttachment[];
//     statusName: any;
// }

// ========================================
// 1. UPDATED ASSET ENTITY (asset.entity.ts)
// ========================================
import { 
  Column, 
  Entity, 
  PrimaryGeneratedColumn, 
  Unique, 
  CreateDateColumn, 
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn
} from "typeorm";
import { AssetAttachment } from "./asset_attachments.entity";
import { AssetStatus } from "./asset_status.entity";
import { Category } from "./asset_category.entity";
import { FundSource } from "./fund_source.entity";
import { SubCounty } from "./sub_county.entity";

@Entity('assets')
@Unique(['barcode'])
@Unique(['serialNumber'])
export class Asset {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  barcode: string;

  @Column({ nullable: true })
  serialNumber: string;

  @Column('decimal', { nullable: true, precision: 10, scale: 2 })
  unitCost: number;

  @Column()
  statusId: number;

  @Column()
  fundSourceId: number;

  @Column()
  categoryId: number;

  @Column({ nullable: true })
  countyId: number;

  @Column({ nullable: true })
  subCountyId: number;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ nullable: true })
  date: string;

  @Column({ nullable: true })
  place: string;

  // Legacy photo fields (backward compatibility)
  @Column({ nullable: true })
  photo1: string;

  @Column({ nullable: true })
  photo2: string;

  @Column({ nullable: true })
  photo3: string;

  @Column({ type: 'double precision', nullable: true })
  latitude: number;

  @Column({ type: 'double precision', nullable: true })
  longitude: number;

  @Column({ type: 'double precision', nullable: true })
  marker: number | null;

  @Column({ nullable: true })
  createdBy: string;

  @Column({ nullable: true })
  modifiedBy: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => AssetStatus, { eager: false })
  @JoinColumn({ name: 'statusId' })
  status: AssetStatus;

  @ManyToOne(() => Category, { eager: false })
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @ManyToOne(() => FundSource, { eager: false })
  @JoinColumn({ name: 'fundSourceId' })
  fundSource: FundSource;

  @ManyToOne(() => SubCounty, { eager: false })
  @JoinColumn({ name: 'subCountyId' })
  subCounty: SubCounty;

  @OneToMany(() => AssetAttachment, (attachment) => attachment.asset)
  attachments: AssetAttachment[];
}
