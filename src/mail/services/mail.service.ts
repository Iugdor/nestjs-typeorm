import { Inject, Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { UsersService } from '../../users/services/users.service';
import { SentMessageInfo } from 'nodemailer';
import { JwtService } from '@nestjs/jwt';
import config from '../../config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(
    private mailerService: MailerService,
    private userService: UsersService,
    private jwtService: JwtService,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  async sendUserConfirmation(userId: number) {
    const user = await this.userService.findOne(userId);

    const token =
      this.validToken(user.confirmationAccountToken) ||
      this.jwtService.sign({ id: user.id });

    // If the token is not undefined and is not equal to the user's actual token
    if (token && token !== user.confirmationAccountToken) {
      user.confirmationAccountToken = token;
      await this.userService.save(user);
    }
    const url = `${this.configService.baseUrl}/confirmation-email?token=${token}`;
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

  validToken(token: string) {
    if (token && this.jwtService.verify(token)) {
      return token;
    }
    return null;
  }
}
