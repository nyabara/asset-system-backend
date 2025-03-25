import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user){
        throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }
  
  
  async create(user: Partial<User>): Promise<User> {
    return this.userRepository.save(user);
  }

  async update(id: number, data: Partial<User>): Promise<void> {
    await this.userRepository.update(id, data);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
