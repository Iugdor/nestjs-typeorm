import { BadRequestException, Injectable } from '@nestjs/common';

import { Product } from './../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from './../dtos/products.dtos';
import { BasicService } from 'src/database/basic-service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BrandsService } from './brands.service';
import { CategoriesService } from './categories.service';

@Injectable()
export class ProductsService extends BasicService<
  Product,
  CreateProductDto,
  UpdateProductDto
> {
  constructor(
    @InjectRepository(Product) repository: Repository<Product>,
    private brandsService: BrandsService,
    private categoriesService: CategoriesService,
  ) {
    super(repository);
  }
  create(data: CreateProductDto) {
    return super.create(data, this.resolveRelations);
  }

  update(id: number, data: UpdateProductDto) {
    return super.update(id, data, this.resolveRelations);
  }

  async removeCategoryByProduct(productId: number, categoryId: number) {
    const product = await this.findOne(productId, { explicit: ['categories'] });
    console.log(product);
    const categories = product.categories.filter(
      (item) => item.id !== categoryId,
    );
    if (categories.length === product.categories.length) {
      throw new BadRequestException(
        `The product #${productId} doesn't belong to the category #${categoryId}`,
      );
    }
    product.categories = categories;
    return this.modelRepository.save(product);
  }
  async addCategoryByProduct(productId: number, categoryId: number) {
    // Lookup for the product with only the reference to categories
    const product = await this.findOne(productId, { explicit: ['categories'] });
    // Lookup for the category without the relations
    const category = await this.categoriesService.findOne(categoryId, {
      withRelations: false,
    });
    if (product.categories.indexOf(category))
      throw new BadRequestException(
        `The product #${productId} already belongs to the category #${categoryId}`,
      );
    // Push the new category
    product.categories.push(category);
    return this.modelRepository.save(product);
  }

  resolveRelations = async (newModel: Product, data: CreateProductDto) => {
    if (data.brandId) {
      const brand = await this.brandsService.findOne(data.brandId, {
        withRelations: false,
      });
      newModel.brand = brand;
    }
    if (data.categoriesIds) {
      const categories = await this.categoriesService.findByIds(
        data.categoriesIds,
      );
      if (categories.length < 1) {
        throw new BadRequestException('Categories array invalid');
      }
      newModel.categories = categories;
    }
  };
}
