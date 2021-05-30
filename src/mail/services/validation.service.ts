import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../users/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ValidationService {
  private readonly logger = new Logger(ValidationService.name);
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async validEmail(token: string) {
    const payload = this.jwtService.decode(token) as any;
    if (!payload.id) {
      throw new ForbiddenException('Invalid userId');
    }
    const user = await this.userRepo.findOne(payload.id);
    if (!user || user.confirmationAccountToken !== token) {
      this.logger.debug(`Invalid token`);
      throw new ForbiddenException('Invalid token');
    }
    user.confirmationAccountToken = null;
    await this.userRepo.save(user);
    this.logger.log(`User with email #${user.email} confirmed`);
    return 'confirmed';
  }
}
