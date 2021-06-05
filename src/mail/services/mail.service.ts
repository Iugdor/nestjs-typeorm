import { Inject, Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SentMessageInfo } from 'nodemailer';
import { JwtService } from '@nestjs/jwt';
import config from '../../config';
import { ConfigType } from '@nestjs/config';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(
    private mailerService: MailerService,
    private jwtService: JwtService,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  async sendConfirmationMail(token: string, user: User) {
    const url = `${this.configService.baseUrl}/users/confirmation-email?token=${token}`;
    console.log(url);
    this.logger.log(`Sending email to ${user.email}`);
    const result: SentMessageInfo = await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to Platzi Store! Confirm your Email',
      template: './confirmation',
      context: {
        name: user.customer.name,
        url,
      },
    });
    this.logger.log(
      `Result to sending email to ${user.email} => ${JSON.stringify(result)}`,
    );
  }

  async sendPasswordRecoveryMail(token: string, user: User) {
    const url = `${this.configService.baseUrl}/users/change-password?token=${token}`;
    console.log(url);
    this.logger.log(`Sending email to ${user.email}`);
    const result: SentMessageInfo = await this.mailerService.sendMail({
      to: user.email,
      subject: 'Platzi Store Password Reset',
      template: './password-recovery',
      context: {
        name: user.customer.name,
        url,
      },
    });
    this.logger.log(
      `Result to sending email to ${user.email} => ${JSON.stringify(result)}`,
    );
  }

  public validToken(token: string) {
    if (token && this.jwtService.verify(token)) {
      return token;
    }
    return null;
  }
}
