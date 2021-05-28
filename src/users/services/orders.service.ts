import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterDto } from 'src/common/dtos/filter.dto';
import { BasicService } from 'src/database/basic-service';
import { Repository } from 'typeorm';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';
import { Order } from '../entities/order.entity';
import { CustomersService } from './customers.service';

@Injectable()
export class OrdersService extends BasicService<
  Order,
  CreateOrderDto,
  UpdateOrderDto,
  FilterDto
> {
  constructor(
    @InjectRepository(Order) repository: Repository<Order>,
    private customersService: CustomersService,
  ) {
    super(repository);
  }

  async create(data: CreateOrderDto) {
    const order = new Order();
    await this.resolveRelations(order, data);
    return this.modelRepository.save(order);
  }

  async update(id: number, changes: UpdateOrderDto) {
    const order = await this.findOne(id);
    await this.resolveRelations(order, changes);
    return this.modelRepository.save(order);
  }

  findByCustomer(customerId: number) {
    console.log(customerId);
    return this.modelRepository.find({ where: { customer: customerId } });
  }
  resolveRelations = async (
    newModel: Order,
    data: CreateOrderDto | UpdateOrderDto,
  ) => {
    if (data.customerId) {
      const customer = await this.customersService.findOne(data.customerId, {
        withRelations: false,
      });
      newModel.customer = customer;
    }
  };
}
