import { Injectable } from '@nestjs/common';

import { Product } from './../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from './../dtos/products.dtos';
import { BasicService } from 'src/database/basic-service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService extends BasicService<
  Product,
  CreateProductDto,
  UpdateProductDto
> {
  constructor(@InjectRepository(Product) repository: Repository<Product>) {
    super(repository);
  }
}
