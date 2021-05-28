import { Injectable } from '@nestjs/common';

import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilterDto } from '../../common/dtos/filter.dto';
import { BasicService } from '../../database/basic-service';

@Injectable()
export class CustomersService extends BasicService<
  Customer,
  CreateCustomerDto,
  UpdateCustomerDto,
  FilterDto
> {
  constructor(@InjectRepository(Customer) repository: Repository<Customer>) {
    super(repository);
  }
}
