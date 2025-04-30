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
    serial_number: string;
  
    @IsString()
    @IsNotEmpty()
    item_code: string;
  
    @IsNumber()
    unit_cost: number;
  
    @IsInt()
    year: number;
  
    @IsNumber()
    statusId: number;
  
    @IsNumber()
    locationId: number;
  
    @IsNumber()
    fundSourceId: number;
  
    @IsNumber()
    categoryId: number;
  
    @IsNumber()
    responsibleUserId: number;
  
    @IsString()
    @IsOptional()
    notes: string;
  }
  