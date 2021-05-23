import { Brand } from 'src/products/entities/brand.entity';
import { Category } from 'src/products/entities/category.entity';
import { Product } from 'src/products/entities/product.entity';
import { OrderItem } from 'src/users/entities/order-item.entity';
import { Order } from 'src/users/entities/order.entity';
import { User } from 'src/users/entities/user.entity';

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
