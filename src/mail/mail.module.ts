import { Module } from '@nestjs/common';
import { join } from 'node:path';
import config from '../config';
import { MailService } from './services/mail.service';
import { ConfigType } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MailerModule.forRootAsync({
      // imports: [ConfigModule], // import module if not enabled globally
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { user, password, from } = configService.mail;
        return {
          // or
          transport: {
            service: 'gmail',
            auth: {
              user,
              pass: password,
            },
            debug: true,
            logger: true,
          },
          defaults: {
            from: `"No Reply" <${from}>`,
          },
          template: {
            dir: join(__dirname, 'templates'),
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
      inject: [config.KEY],
    }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        const { jwtSecret, expiresIn } = configService.confirmationEmailToken;
        return {
          secret: jwtSecret,
          signOptions: {
            expiresIn: expiresIn,
          },
        };
      },
      inject: [config.KEY],
    }),
  ],
  providers: [MailService],
  exports: [MailService, JwtModule],
})
export class MailModule {}
