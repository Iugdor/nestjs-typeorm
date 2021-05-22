import { Injectable } from '@nestjs/common';

import { Category } from '../entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dtos';
import { BasicService } from 'src/database/basic-service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService extends BasicService<
  Category,
  CreateCategoryDto,
  UpdateCategoryDto
> {
  constructor(@InjectRepository(Category) repository: Repository<Category>) {
    super(repository);
  }
}
