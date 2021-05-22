import { Brand } from 'src/products/entities/brand.entity';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';

type Relations = {
  [Property in keyof Entities]+?: (keyof Entities[Property])[];
};

export const RELATIONS: Relations = {
  user: ['customer'],
  product: ['brand'],
  brand: ['products'],
};

class Entities {
  user: User;
  product: Product;
  brand: Brand;
}
