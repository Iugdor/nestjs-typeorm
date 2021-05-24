import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

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
}
