import { Exclude, Expose } from 'class-transformer';
import { BasicEntity } from 'src/database/base.entity';
import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Customer } from './customer.entity';
import { OrderItem } from './order-item.entity';

@Entity()
export class Order extends BasicEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Customer, (customer) => customer.orders)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @Exclude()
  @OneToMany(() => OrderItem, (item) => item.order)
  items: OrderItem[];

  @Expose()
  get products() {
    if (this.items) {
      return this.items
        .filter((item) => !!item)
        .map((item) => ({
          ...item.product,
          quantity: item.quantity,
          itemId: item.id,
        }));
    }
    return [];
  }

  @Expose()
  get total() {
    if (this.items) {
      return this.items
        .filter((item) => !!item)
        .reduce((total, item) => {
          const totalItem = item.product.price * item.quantity;
          return total + totalItem;
        }, 0);
    }
    return 0;
  }
}
