import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { County } from 'src/entities/county.entity';

@Injectable()
export class CountyService {
  constructor(
    @Inject('COUNTY_REPOSITORY')
    private readonly countyRepository: Repository<County>,
  ) {}

  async findAll(): Promise<County[]> {
    return this.countyRepository.find();
  }

  async findOne(id: number): Promise<County> {
    const county = await this.countyRepository.findOne({ where: { id } });
    if (!county){
        throw new NotFoundException(`County with ID ${id} not found`);
    }
    return county;
  }
  
  
  async create(county: Partial<County>): Promise<County> {
    return this.countyRepository.save(county);
  }

  async update(id: number, data: Partial<County>): Promise<void> {
    await this.countyRepository.update(id, data);
  }

  async remove(id: number): Promise<void> {
    await this.countyRepository.delete(id);
  }
}
