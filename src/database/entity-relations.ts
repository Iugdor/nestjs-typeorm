import { Brand } from '../products/entities/brand.entity';
import { Category } from '../products/entities/category.entity';
import { Product } from '../products/entities/product.entity';
import { OrderItem } from '../users/entities/order-item.entity';
import { Order } from '../users/entities/order.entity';
import { User } from '../users/entities/user.entity';

type Relations = {
  [Property in keyof Entities]+?: (keyof Entities[Property])[];
};

export const RELATIONS = {
  user: ['customer'],
  product: ['brand', 'categories'],
  brand: ['products'],
  category: ['products'],
  order: ['customer', 'items', 'items.product'],
  order_item: ['product'],
};

interface Entities {
  user: User;
  product: Product;
  brand: Brand;
  category: Category;
  order: Order;
  item: OrderItem;
}
