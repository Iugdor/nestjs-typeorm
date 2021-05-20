import {
  Body,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { BasicService } from './basic-service';

export class BasicController<T, C, U> {
  constructor(private modelService: BasicService<T, C, U>) {}

  @Get()
  getProducts() {
    return this.modelService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.modelService.findOne(id);
  }

  @Post()
  create(@Body() payload: C) {
    return this.modelService.create(payload);
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
