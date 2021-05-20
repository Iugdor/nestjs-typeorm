import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';

import { CustomersService } from '../services/customers.service';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';
import { BasicController } from 'src/database/basic.controller';
import { Customer } from '../entities/customer.entity';

@Controller('customers')
export class CustomerController extends BasicController<
  Customer,
  CreateCustomerDto,
  UpdateCustomerDto
> {
  constructor(private customersService: CustomersService) {
    super(customersService);
  }
}
