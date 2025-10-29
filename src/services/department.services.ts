import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Department } from 'src/entities/departments.entity';

@Injectable()
export class DepartmentService {
  constructor(
    @Inject('DEPARTMENT_REPOSITORY')
    private readonly departmentRepository: Repository<Department>,
  ) {}

  /**
   * Get all departments
   */
  async findAll(): Promise<Department[]> {
    return this.departmentRepository.find({
      order: { departmentName: 'ASC' }
    });
  }

  /**
   * Get active departments only
   */
  async findActive(): Promise<Department[]> {
    return this.departmentRepository.find({
      where: { isActive: true },
      order: { departmentName: 'ASC' }
    });
  }

  /**
   * Get single department
   */
  async findOne(id: number): Promise<Department> {
    const department = await this.departmentRepository.findOne({ 
      where: { id } 
    });

    if (!department) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }

    return department;
  }

  /**
   * Create department
   */
  async create(department: Partial<Department>): Promise<Department> {
    return this.departmentRepository.save(department);
  }

  /**
   * Update department
   */
  async update(id: number, data: Partial<Department>): Promise<void> {
    const result = await this.departmentRepository.update(id, data);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }
  }

  /**
   * Delete department
   */
  async remove(id: number): Promise<void> {
    const result = await this.departmentRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }
  }
}