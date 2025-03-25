import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { FundSource } from 'src/entities/fund_source.entity'; 

@Injectable()
export class FundSourceService {
  constructor(
    @Inject('FUND_SOURCE_REPOSITORY')
    private readonly fundSourceRepository: Repository<FundSource>,
  ) {}

  async findAll(): Promise<FundSource[]> {
    return this.fundSourceRepository.find();
  }

  async findOne(id: number): Promise<FundSource> {
    const fundSource = await this.fundSourceRepository.findOne({ where: { id } });
    if (!fundSource){
        throw new NotFoundException(`FundSource with ID ${id} not found`);
    }
    return fundSource;
  }
  
  
  async create(fundSource: Partial<FundSource>): Promise<FundSource> {
    return this.fundSourceRepository.save(fundSource);
  }

  async update(id: number, data: Partial<FundSource>): Promise<void> {
    await this.fundSourceRepository.update(id, data);
  }

  async remove(id: number): Promise<void> {
    await this.fundSourceRepository.delete(id);
  }
}