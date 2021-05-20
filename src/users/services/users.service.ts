import { Injectable } from '@nestjs/common';

import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BasicService } from 'src/database/basic-service';
import { CustomersService } from './customers.service';

@Injectable()
export class UsersService extends BasicService<
  User,
  CreateUserDto,
  UpdateUserDto
> {
  constructor(
    @InjectRepository(User) repository: Repository<User>,
    private customerService: CustomersService,
  ) {
    super(repository);
  }
  create(data: CreateUserDto) {
    return super.create(data, async (newModel: User, data: CreateUserDto) => {
      if (data.customerId) {
        const customer = await this.customerService.findOne(data.customerId);
        newModel.customer = customer;
      }
    });
  }
}
