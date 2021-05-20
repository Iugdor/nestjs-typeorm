import { Controller } from '@nestjs/common';

import { UsersService } from '../services/users.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { BasicController } from 'src/database/basic.controller';
import { User } from '../entities/user.entity';

@Controller('users')
export class UsersController extends BasicController<
  User,
  CreateUserDto,
  UpdateUserDto
> {
  constructor(private usersService: UsersService) {
    super(usersService);
  }
}
