// import {
//     IsString,
//     IsNotEmpty,
//     IsNumber,
//     IsOptional,
//     IsInt,
//   } from 'class-validator';
  
// export class CreateAssetDto {
//   @IsString()
//   @IsNotEmpty()
//   description: string;

//   @IsString()
//   @IsNotEmpty()
//   barcode: string;

//   @IsString()
//   @IsNotEmpty()
//   serialNumber: string;

//   @IsNumber()
//   unitCost: number;

//   @IsNumber()
//   statusId: number;

//   @IsNumber()
//   fundSourceId: number;

//   @IsNumber()
//   categoryId: number;

//   @IsNumber()
//   countyId: number;

//   @IsNumber()
//   subCountyId: number;

//   @IsString()
//   @IsOptional()
//   notes?: string;

//   @IsString()
//   @IsOptional()
//   date?: string;

//   @IsString()
//   @IsOptional()
//   place?: string;

//   @IsString()
//   @IsOptional()
//   photo1?: string;

//   @IsString()
//   @IsOptional()
//   photo2?: string;

//   @IsString()
//   @IsOptional()
//   photo3?: string;

//   @IsNumber()
//   @IsOptional()
//   latitude?: number;

//   @IsNumber()
//   @IsOptional()
//   longitude?: number;
// }
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsArray,
} from 'class-validator';

export class CreateAssetDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  barcode: string;

  @IsString()
  @IsNotEmpty()
  serialNumber: string;

  @IsNumber()
  unitCost: number;

  @IsNumber()
  statusId: number;

  @IsNumber()
  fundSourceId: number;

  @IsNumber()
  categoryId: number;

  @IsNumber()
  countyId: number;

  @IsNumber()
  subCountyId: number;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsString()
  @IsOptional()
  date?: string;

  @IsString()
  @IsOptional()
  place?: string;

  // Keep old photo fields for backward compatibility (DEPRECATED)
  @IsString()
  @IsOptional()
  photo1?: string;

  @IsString()
  @IsOptional()
  photo2?: string;

  @IsString()
  @IsOptional()
  photo3?: string;

  @IsNumber()
  @IsOptional()
  latitude?: number;

  @IsNumber()
  @IsOptional()
  longitude?: number;

  // ========== NEW: Audit fields ==========
  @IsString()
  @IsOptional()
  createdBy?: string; // Who is creating this asset

  // ========== NEW: Image URLs from upload ==========
  // These will be used to create attachment records
  @IsArray()
  @IsOptional()
  imageUrls?: string[]; // Array of uploaded image URLs
}

export class UpdateAssetDto {
  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  barcode?: string;

  @IsString()
  @IsOptional()
  serialNumber?: string;

  @IsNumber()
  @IsOptional()
  unitCost?: number;

  @IsNumber()
  @IsOptional()
  statusId?: number;

  @IsNumber()
  @IsOptional()
  fundSourceId?: number;

  @IsNumber()
  @IsOptional()
  categoryId?: number;

  @IsNumber()
  @IsOptional()
  countyId?: number;

  @IsNumber()
  @IsOptional()
  subCountyId?: number;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsString()
  @IsOptional()
  date?: string;

  @IsString()
  @IsOptional()
  place?: string;

  @IsNumber()
  @IsOptional()
  latitude?: number;

  @IsNumber()
  @IsOptional()
  longitude?: number;

  // ========== NEW: Audit field ==========
  @IsString()
  @IsOptional()
  modifiedBy?: string; // Who is updating this asset
}
  