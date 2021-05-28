import { Injectable } from '@nestjs/common';

import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BasicService } from '../../database/basic-service';
import { CustomersService } from './customers.service';
import { FilterDto } from '../../common/dtos/filter.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService extends BasicService<
  User,
  CreateUserDto,
  UpdateUserDto,
  FilterDto
> {
  constructor(
    @InjectRepository(User) modelRepository: Repository<User>,
    private customerService: CustomersService,
  ) {
    super(modelRepository);
  }
  async create(data: CreateUserDto) {
    // Create an instance of the model using data which is the create dto
    const newUser = this.modelRepository.create(data);
    await this.resolveRelations(newUser, data);

    const hashPassword = await bcrypt.hash(newUser.password, 10);

    newUser.password = hashPassword;
    return this.modelRepository.save(newUser);
  }

  async update(id: number, data: UpdateUserDto) {
    return super.update(id, data, this.resolveRelations);
  }

  findByEmail(email: string) {
    return this.modelRepository.findOne({
      where: { email },
      relations: ['customer'],
    });
  }

  resolveRelations = async (newModel: User, data: CreateUserDto) => {
    if (data.customerId) {
      const customer = await this.customerService.findOne(data.customerId);
      newModel.customer = customer;
    }
  };
}
