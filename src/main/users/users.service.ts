import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { Users } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async findAll(): Promise<Users[]> {
    return await this.userRepository.find({
      select: ['id', 'firstName', 'lastName', 'email'],
    });
  }

  async findOneOrFail(conditions: FindOneOptions<Users>): Promise<Users> {
    try {
      return await this.userRepository.findOneOrFail(conditions);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async create(data: CreateUserDTO): Promise<Users> {
    const user = await this.userRepository.create(data);
    return await this.userRepository.save(user);
  }

  async update(id: string, data: UpdateUserDTO): Promise<Users> {
    const user = await this.findOneOrFail({ where: { id } });
    this.userRepository.merge(user, data);
    return await this.userRepository.save(user);
  }

  async delete(id: string): Promise<void> {
    await this.findOneOrFail({ where: { id } });
    this.userRepository.delete({ id });
  }
}
