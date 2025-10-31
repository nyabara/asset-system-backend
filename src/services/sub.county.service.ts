// import { Inject, Injectable, NotFoundException } from '@nestjs/common';
// import { Repository } from 'typeorm';
// import { SubCounty } from 'src/entities/sub_county.entity';

// @Injectable()
// export class SubCountyService {
//   constructor(
//     @Inject('SUB_COUNTY_REPOSITORY')
//     private readonly subCountyRepository: Repository<SubCounty>,
//   ) {}

//   async findAll(): Promise<SubCounty[]> {
//     return this.subCountyRepository.find();
//   }

//   async findOne(id: number): Promise<SubCounty> {
//     const subCounty = await this.subCountyRepository.findOne({ 
//       where: { id }
//     });

//     if (!subCounty) {
//       throw new NotFoundException(`SubCounty with ID ${id} not found`);
//     }
//     return subCounty;
//   }

//   async create(subCountyData: Partial<SubCounty>): Promise<SubCounty> {
//     const subCounty = this.subCountyRepository.create(subCountyData);
//     return this.subCountyRepository.save(subCounty);
//   }

//   async update(id: number, subCountyData: Partial<SubCounty>): Promise<SubCounty> {
//     const subCounty = await this.findOne(id);
//     Object.assign(subCounty, subCountyData);
//     return this.subCountyRepository.save(subCounty);
//   }

//   async delete(id: number): Promise<void> {
//     const result = await this.subCountyRepository.delete(id);
//     if (result.affected === 0) {
//       throw new NotFoundException(`SubCounty with ID ${id} not found`);
//     }
//   }
// }
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SubCounty } from 'src/entities/sub_county.entity';

@Injectable()
export class SubCountyService {
  constructor(
    @Inject('SUB_COUNTY_REPOSITORY')
    private readonly subCountyRepository: Repository<SubCounty>,
  ) {}

  /**
   * Get all sub-counties with county relation
   * Used by Android dropdown
   */
  async findAll(): Promise<SubCounty[]> {
    return this.subCountyRepository.find({
      relations: ['county'],
      order: { subCountyName: 'ASC' }
    });
  }

  /**
   * Get sub-counties by county ID
   * Useful for filtering
   */
  async findByCountyId(countyId: number): Promise<SubCounty[]> {
    return this.subCountyRepository.find({
      where: { countyId },
      relations: ['county'],
      order: { subCountyName: 'ASC' }
    });
  }

  /**
   * Get single sub-county by ID
   */
  async findOne(id: number): Promise<SubCounty> {
    const subCounty = await this.subCountyRepository.findOne({ 
      where: { id },
      relations: ['county']
    });

    if (!subCounty) {
      throw new NotFoundException(`SubCounty with ID ${id} not found`);
    }
    return subCounty;
  }

  /**
   * Create new sub-county
   */
  async create(subCountyData: Partial<SubCounty>): Promise<SubCounty> {
    const subCounty = this.subCountyRepository.create(subCountyData);
    const saved = await this.subCountyRepository.save(subCounty);
    
    // Return with relations
    return this.findOne(saved.id);
  }

  /**
   * Update sub-county
   */
  async update(id: number, subCountyData: Partial<SubCounty>): Promise<SubCounty> {
    const subCounty = await this.findOne(id);
    Object.assign(subCounty, subCountyData);
    await this.subCountyRepository.save(subCounty);
    
    // Return with relations
    return this.findOne(id);
  }

  /**
   * Delete sub-county
   */
  async delete(id: number): Promise<void> {
    const result = await this.subCountyRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`SubCounty with ID ${id} not found`);
    }
  }
}