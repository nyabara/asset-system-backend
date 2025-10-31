// import { Inject, Injectable, NotFoundException } from '@nestjs/common';
// import { Repository } from 'typeorm';
// import { Location } from 'src/entities/location.entity';

// @Injectable()
// export class LocationService {
//   constructor(
//     @Inject('LOCATION_REPOSITORY')
//     private readonly locationRepository: Repository<Location>,
//   ) {}

//   async findAll(): Promise<Location[]> {
//     return this.locationRepository.find({ relations: ['sub_county'] });
//   }

//   async findOne(id: number): Promise<Location> {
//     const location = await this.locationRepository.findOne({ 
//       where: { id }, 
//       relations: ['sub_county']
//     });

//     if (!location) {
//       throw new NotFoundException(`Location with ID ${id} not found`);
//     }
//     return location;
//   }

//   async create(locationData: Partial<Location>): Promise<Location> {
//     const location = this.locationRepository.create(locationData);
//     return this.locationRepository.save(location);
//   }

//   async update(id: number, locationData: Partial<Location>): Promise<Location> {
//     const location = await this.findOne(id);
//     Object.assign(location, locationData);
//     return this.locationRepository.save(location);
//   }

//   async delete(id: number): Promise<void> {
//     const result = await this.locationRepository.delete(id);
//     if (result.affected === 0) {
//       throw new NotFoundException(`Location with ID ${id} not found`);
//     }
//   }
// }
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Location } from 'src/entities/location.entity';
import { CreateLocationDto, UpdateLocationDto } from 'src/dtos/location.dto';

@Injectable()
export class LocationService {
  constructor(
    @Inject('LOCATION_REPOSITORY')
    private readonly locationRepository: Repository<Location>,
  ) {}

  /**
   * Get all locations with sub_county relation
   * Returns locations with nested sub_county and county data
   */
  async findAll(): Promise<Location[]> {
    return this.locationRepository.find({ 
      relations: ['sub_county', 'sub_county.county']
    });
  }

  /**
   * Get single location by ID with relations
   */
  async findOne(id: number): Promise<Location> {
    const location = await this.locationRepository.findOne({ 
      where: { id }, 
      relations: ['sub_county', 'sub_county.county']
    });

    if (!location) {
      throw new NotFoundException(`Location with ID ${id} not found`);
    }
    return location;
  }

  /**
   * Create new location
   * Accepts DTO with location_name and subCountyId
   */
  async create(dto: CreateLocationDto): Promise<Location> {
    const location = this.locationRepository.create({
      location_name: dto.location_name,
      subCountyId: dto.subCountyId
    });
    
    const saved = await this.locationRepository.save(location);
    
    // Fetch with relations to return complete data
    return this.findOne(saved.id);
  }

  /**
   * Update existing location
   */
  async update(id: number, dto: UpdateLocationDto): Promise<Location> {
    const location = await this.findOne(id);
    
    if (dto.location_name) {
      location.location_name = dto.location_name;
    }
    
    if (dto.subCountyId) {
      location.subCountyId = dto.subCountyId;
    }
    
    await this.locationRepository.save(location);
    
    // Fetch with relations to return complete data
    return this.findOne(id);
  }

  /**
   * Delete location
   */
  async delete(id: number): Promise<void> {
    const result = await this.locationRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Location with ID ${id} not found`);
    }
  }
}