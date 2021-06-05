import { Injectable, ForbiddenException } from '@nestjs/common';

import { User } from '../entities/user.entity';
import {
  CreateUserDto,
  UpdateUserDto,
  UserChangePasswordDto,
} from '../dtos/user.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BasicService } from '../../database/basic-service';
import { FilterDto } from '../../common/dtos/filter.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../../mail/services/mail.service';

@Injectable()
export class UsersService extends BasicService<
  User,
  CreateUserDto,
  UpdateUserDto,
  FilterDto
> {
  constructor(
    @InjectRepository(User) modelRepository: Repository<User>,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {
    super(modelRepository);
  }
  async create(data: CreateUserDto) {
    // Create an instance of the model using data which is the create dto
    const newUser = this.modelRepository.create(data);

    newUser.password = await this._hashPassword(newUser.password);
    return this.modelRepository.save(newUser);
  }

  findByEmail(email: string) {
    return this.modelRepository.findOne({
      where: { email },
      relations: ['customer'],
    });
  }

  async passwordRecovery(userId: number) {
    const user = await this.findOne(userId);
    const token =
      this.mailService.validToken(user.passwordRecoveryToken) ||
      this.jwtService.sign({ id: user.id });

    // If the token is not undefined and is not equal to the user's actual token
    if (token && token !== user.passwordRecoveryToken) {
      user.passwordRecoveryToken = token;
      await this.modelRepository.save(user);
    }
    await this.mailService.sendPasswordRecoveryMail(token, user);
    return 'The password recovery mail will be sent soon!';
  }

  /**
   * Confirm the user's email
   * @param token The obtained token from the confirmation email mail
   * @returns User data
   */
  async confirmEmail(token: string) {
    const payload = this.jwtService.decode(token) as any;
    if (!payload.id) {
      throw new ForbiddenException('Invalid userId');
    }
    const user = await this.modelRepository.findOne(payload.id);
    if (!user || user.confirmationAccountToken !== token) {
      throw new ForbiddenException('Invalid token');
    }
    user.confirmationAccountToken = null;
    user.email_confirmed = true;
    await this.modelRepository.save(user);
    this.logger.log(`User with email #${user.email} confirmed`);
    return user;
  }

  /**
   * Change the user's password
   * @param token The obtained token from the password recovery mail
   * @param data The payload with the new password
   * @returns The user data
   */
  async changePassword(token: string, data: UserChangePasswordDto) {
    const payload = this.jwtService.decode(token) as any;
    if (!payload.id) {
      this.logger.warn('Invalid userId in change password');
      throw new ForbiddenException('Invalid token');
    }
    const user = await this.modelRepository.findOne(payload.id);
    if (!user || user.passwordRecoveryToken !== token) {
      this.logger.warn(
        "Invalid token, the user doesn't exist or the token is not for password recovery",
      );
      throw new ForbiddenException('Invalid token');
    }
    // Delete the token from user
    user.passwordRecoveryToken = null;
    // Update the password
    user.password = await this._hashPassword(data.password);
    await this.modelRepository.save(user);
    this.logger.log(`User with email #${user.email} has changed his password `);
    return user;
  }

  private async _hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }
}
