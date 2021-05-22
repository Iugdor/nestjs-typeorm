import { Injectable } from '@nestjs/common';

import { Product } from './../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from './../dtos/products.dtos';
import { BasicService } from 'src/database/basic-service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BrandsService } from './brands.service';

@Injectable()
export class ProductsService extends BasicService<
  Product,
  CreateProductDto,
  UpdateProductDto
> {
  resolveRelations = async (newModel: Product, data: CreateProductDto) => {
    if (data.brandId) {
      const brand = await this.brandsService.findOne(data.brandId);
      newModel.brand = brand;
    }
  };

  constructor(
    @InjectRepository(Product) repository: Repository<Product>,
    private brandsService: BrandsService,
  ) {
    super(repository);
  }
  create(data: CreateProductDto) {
    return super.create(data, this.resolveRelations);
  }

  update(id: number, data: UpdateProductDto) {
    return super.update(id, data, this.resolveRelations);
  }
}
