import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BasicService } from 'src/database/basic-service';
import { ProductsService } from 'src/products/services/products.service';
import { Repository } from 'typeorm';
import { CreateOrderItemDto, UpdateOrderItemDto } from '../dtos/order-item.dto';
import { OrderItem } from '../entities/order-item.entity';
import { OrdersService } from './orders.service';

@Injectable()
export class OrderItemsService extends BasicService<
  OrderItem,
  CreateOrderItemDto,
  UpdateOrderItemDto
> {
  constructor(
    @InjectRepository(OrderItem) modelRepository: Repository<OrderItem>,
    private ordersService: OrdersService,
    private productsService: ProductsService,
  ) {
    super(modelRepository);
  }

  async create(data: CreateOrderItemDto) {
    const { orderId, productId, quantity } = data;
    const order = await this.ordersService.findOne(orderId);
    const product = await this.productsService.findOne(productId);
    if (product.stock < quantity)
      throw new BadRequestException(
        `There is not enough  product #${productId} in stock for this request `,
      );
    // Update product's stock
    product.stock -= quantity;
    await this.productsService.save(product);
    // Create the order item
    const item = new OrderItem();
    item.order = order;
    item.product = product;
    item.quantity = quantity;
    return this.modelRepository.save(item);
  }

  async update(id: number, changes: UpdateOrderItemDto) {
    const item = await this.findOne(id);
    const { quantity } = changes;
    const quantityDiference = quantity - item.quantity;
    if (item.product.stock < quantityDiference) {
      throw new BadRequestException(
        `There is not enough  product #${item.product.id} in stock for this request `,
      );
    }
    // Update product's stock
    const product = item.product;
    product.stock -= quantityDiference;
    this.productsService.save(product);
    // Update order item's quantity
    item.quantity = quantity;
    return this.modelRepository.save(item);
  }

  async remove(id: number) {
    const item = await super.remove(id);

    //Update product's stock
    const product = item.product;
    product.stock += item.quantity;
    await this.productsService.save(product);

    return item;
  }
}
