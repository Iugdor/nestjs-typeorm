import {
  BadRequestException,
  Body,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseFilters,
} from '@nestjs/common';
import { TypeOrmExceptionFilter } from '../common/exceptions/TypeOrmExceptionFilter';
import { BasicService } from './basic-service';

export class BasicController<T, C, U> {
  constructor(private modelService: BasicService<T, C, U>) {}

  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.modelService.findOne(id);
  }

  @Post()
  create(@Body() payload: C) {
    try {
      return this.modelService.create(payload);
    } catch (err) {
      console.log('enter');
      throw new BadRequestException(err.detail);
    }
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() payload: U) {
    return this.modelService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.modelService.remove(id);
  }
}
