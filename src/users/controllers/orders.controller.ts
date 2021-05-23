import { Controller } from '@nestjs/common';
import { BasicController } from 'src/database/basic.controller';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';
import { Order } from '../entities/order.entity';
import { OrdersService } from '../services/orders.service';

@Controller('orders')
export class OrdersController extends BasicController<
  Order,
  CreateOrderDto,
  UpdateOrderDto
> {
  constructor(private orderService: OrdersService) {
    super(orderService);
  }
}
