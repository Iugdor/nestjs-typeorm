import { Injectable } from '@nestjs/common';

import { Brand } from '../entities/brand.entity';
import { BasicService } from 'src/database/basic-service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dtos';
import { FilterDto } from 'src/common/dtos/filter.dto';

@Injectable()
export class BrandsService extends BasicService<
  Brand,
  CreateBrandDto,
  UpdateBrandDto,
  FilterDto
> {
  constructor(@InjectRepository(Brand) repository: Repository<Brand>) {
    super(repository);
  }
}
