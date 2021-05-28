import { Client } from 'pg';

import { Module, Global } from '@nestjs/common';
import config from '../config';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

const API_KEY = '12345634';
const API_KEY_PROD = 'PROD1212121SA';

const client = new Client({
  user: 'root',
  host: 'localhost',
  database: 'my_db',
  password: 'root',
  port: 5432,
});

client.connect();

@Global()
@Module({
  imports: [
    //Connection using TypeOrmModule
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        const { postgresUrl } = configService;
        return {
          type: 'postgres',
          url: postgresUrl,
          synchronize: false,
          autoLoadEntities: true,
          ssl: {
            rejectUnauthorized: false,
          },
        };
      },
      inject: [config.KEY],
    }),
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      // Basic connection to Postgres
      provide: 'PG',
      useFactory: (configService: ConfigType<typeof config>) => {
        const { postgresUrl } = configService;
        const client = new Client({
          connectionString: postgresUrl,
          ssl: {
            rejectUnauthorized: false,
          },
        });

        client.connect();
        return client;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['API_KEY', 'PG', TypeOrmModule],
})
export class DatabaseModule {}
