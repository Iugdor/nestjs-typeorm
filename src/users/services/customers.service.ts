import { Injectable } from '@nestjs/common';

import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';
import { BasicService } from 'src/database/basic-service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CustomersService extends BasicService<
  Customer,
  CreateCustomerDto,
  UpdateCustomerDto
> {
  constructor(@InjectRepository(Customer) repository: Repository<Customer>) {
    super(repository);
  }
}
