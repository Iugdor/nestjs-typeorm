import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { PayloadToken, SubToken } from '../models/token.model';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    const isMatch = async (password, passwordDb) => {
      return await bcrypt.compare(password, passwordDb);
    };
    if (user && (await isMatch(password, user.password))) {
      return user;
    } else {
      return null;
    }
  }
  generateJWT(user: User) {
    const sub: SubToken = {
      userId: user.id,
      customerId: user.customer ? user.customer.id : null,
    };
    const payload: PayloadToken = { role: user.role, sub };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
