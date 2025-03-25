import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Location } from 'src/entities/location.entity';

@Injectable()
export class LocationService {
  constructor(
    @Inject('LOCATION_REPOSITORY')
    private readonly locationRepository: Repository<Location>,
  ) {}

  async findAll(): Promise<Location[]> {
    return this.locationRepository.find({ relations: ['sub_county'] });
  }

  async findOne(id: number): Promise<Location> {
    const location = await this.locationRepository.findOne({ 
      where: { id }, 
      relations: ['sub_county']
    });

    if (!location) {
      throw new NotFoundException(`Location with ID ${id} not found`);
    }
    return location;
  }

  async create(locationData: Partial<Location>): Promise<Location> {
    const location = this.locationRepository.create(locationData);
    return this.locationRepository.save(location);
  }

  async update(id: number, locationData: Partial<Location>): Promise<Location> {
    const location = await this.findOne(id);
    Object.assign(location, locationData);
    return this.locationRepository.save(location);
  }

  async delete(id: number): Promise<void> {
    const result = await this.locationRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Location with ID ${id} not found`);
    }
  }
}
