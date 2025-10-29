// ========================================
// department.controller.ts
// ========================================
import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { DepartmentService } from 'src/services/department.services';
import { Department } from 'src/entities/departments.entity';

@Controller('departments')
export class DepartmentController {
  constructor(
    private readonly departmentService: DepartmentService,
  ) {}

  @Get()
  async findAll() {
    return this.departmentService.findAll();
  }

  @Get('active')
  async findActive() {
    return this.departmentService.findActive();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.departmentService.findOne(id);
  }

  @Post()
  async create(@Body() department: Partial<Department>) {
    return this.departmentService.create(department);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<Department>
  ) {
    return this.departmentService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.departmentService.remove(id);
  }
}