import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import {
  CreateUserDto,
  UpdateUserDto,
  UserChangePasswordDto,
} from '../dtos/user.dto';
import { FilterDto } from '../../common/dtos/filter.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../../auth/decorators/public.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Request } from 'express';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../auth/models/roles.models';
import { PayloadToken } from '../../auth/models/token.model';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.usersService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserDto,
  ) {
    return this.usersService.update(id, payload);
  }

  @Public()
  @Get('confirmation-email')
  confirmEmail(@Query('token') token: string) {
    return this.usersService.confirmEmail(token);
  }

  @Roles(Role.CUSTOMER)
  @Get('password-recovery')
  getOrders(@Req() req: Request) {
    const user = req.user as PayloadToken;
    return this.usersService.passwordRecovery(user.sub.customerId);
  }

  @Public()
  @Get('change-password')
  changePassword(
    @Query('token') token: string,
    @Body() data: UserChangePasswordDto,
  ) {
    return this.usersService.changePassword(token, data);
  }

  @Get()
  getAll(@Query() params: FilterDto) {
    return this.usersService.findAll(params);
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
