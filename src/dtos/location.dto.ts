// ========================================
// DTOs for Location Management
// ========================================

import { IsString, IsNotEmpty, IsInt } from 'class-validator';

/**
 * DTO for creating a location
 */
export class CreateLocationDto {
  @IsString()
  @IsNotEmpty()
  location_name: string;

  @IsInt()
  @IsNotEmpty()
  subCountyId: number;
}

/**
 * DTO for updating a location
 */
export class UpdateLocationDto {
  @IsString()
  @IsNotEmpty()
  location_name?: string;

  @IsInt()
  subCountyId?: number;
}