import { Controller } from '@nestjs/common';
import { BasicController } from 'src/database/basic.controller';
import { Category } from '../entities/category.entity';

import { CategoriesService } from '../services/categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from './../dtos/category.dtos';

@Controller('categories')
export class CategoriesController extends BasicController<
  Category,
  CreateCategoryDto,
  UpdateCategoryDto
> {
  constructor(private categoriesService: CategoriesService) {
    super(categoriesService);
  }
}
