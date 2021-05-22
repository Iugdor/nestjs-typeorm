import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { BrandsService } from '../services/brands.service';
import { BasicController } from 'src/database/basic.controller';
import { Brand } from '../entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dtos';

@ApiTags('brands')
@Controller('brands')
export class BrandsController extends BasicController<
  Brand,
  CreateBrandDto,
  UpdateBrandDto
> {
  constructor(private brandsService: BrandsService) {
    super(brandsService);
  }
}
