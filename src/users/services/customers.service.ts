import { Injectable } from '@nestjs/common';

import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilterDto } from '../../common/dtos/filter.dto';
import { BasicService } from '../../database/basic-service';
import { User } from '../entities/user.entity';
import { MailService } from '../../mail/services/mail.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CustomersService extends BasicService<
  Customer,
  CreateCustomerDto,
  UpdateCustomerDto,
  FilterDto
> {
  constructor(
    @InjectRepository(Customer) repository: Repository<Customer>,
    @InjectRepository(User) private userRepo: Repository<User>,
    private mailService: MailService,
    private jwtService: JwtService,
  ) {
    super(repository);
  }

  async create(data: CreateCustomerDto) {
    // Create a customer instance
    const customer = this.modelRepository.create(data);

    // Create a customer instance
    const user = this.userRepo.create(data.user);
    const hashPassword = await bcrypt.hash(user.password, 10);
    user.password = hashPassword;
    user.role = 'customer';

    customer.user = user;

    await this.modelRepository.save(customer);

    this.logger.log(`Customer #${customer.name} created`);

    // Create token for email confirmation
    const token =
      this.mailService.validToken(user.confirmationAccountToken) ||
      this.jwtService.sign({ id: user.id });

    // If the token is not undefined and is not equal to the user's actual token
    if (token && token !== user.confirmationAccountToken) {
      user.confirmationAccountToken = token;
      await this.userRepo.save(user);
    }

    // Send email verification
    // TODO Put this on a queue
    await this.mailService.sendConfirmationMail(token, user);

    return customer;
  }
}
