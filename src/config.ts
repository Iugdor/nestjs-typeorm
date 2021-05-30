import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      name: process.env.DATABASE_NAME,
      port: process.env.DATABASE_PORT,
    },
    postgresUrl: process.env.DATABASE_URL,
    postgres: {
      dbName: process.env.POSTGRES_DB,
      port: parseInt(process.env.POSTGRES_PORT, 10),
      password: process.env.POSTGRES_PASSWORD,
      user: process.env.POSTGRES_USER,
      host: process.env.POSTGRES_HOST,
    },
    mail: {
      host: process.env.MAIL_HOST,
      user: process.env.MAIL_USER,
      port: process.env.MAIL_PORT,
      secure: process.env.MAIL_SECURE,
      password: process.env.MAIL_PASSWORD,
      from: process.env.MAIL_FROM,
    },
    mailTransport: process.env.MAIL_TRANSPORT,
    baseUrl: process.env.BASE_URL,
    confirmationEmailToken: {
      jwtSecret: process.env.CONFIRMATION_JWT_SECRET,
      expiresIn: process.env.CONFIRMATION_EXPIRES_IN,
    },
    jwtSecret: process.env.JWT_SECRET,
  };
});
