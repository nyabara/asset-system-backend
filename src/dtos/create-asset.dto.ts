import {
    IsString,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsInt,
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
}

  