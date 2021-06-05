import { Brand } from '../products/entities/brand.entity';
import { Category } from '../products/entities/category.entity';
import { Product } from '../products/entities/product.entity';
import { Customer } from '../users/entities/customer.entity';
import { OrderItem } from '../users/entities/order-item.entity';
import { Order } from '../users/entities/order.entity';
import { User } from '../users/entities/user.entity';

type Relations = {
  [Property in keyof Entities]+?: (keyof Entities[Property])[] | string[];
};

export const RELATIONS: Relations = {
  user: ['customer'],
  customer: ['user'],
  product: ['brand', 'categories'],
  brand: ['products'],
  category: ['products'],
  order: ['customer', 'items', 'items.product'],
  order_item: ['product'],
};

interface Entities {
  user: User;
  product: Product;
  order_item: OrderItem;
  brand: Brand;
  category: Category;
  order: Order;
  item: OrderItem;
  customer: Customer;
}
