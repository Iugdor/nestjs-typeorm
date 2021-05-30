import { Module, Global } from '@nestjs/common';
import config from '../config';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// const client = new Client({
//   user: 'root',
//   host: 'localhost',
//   database: 'my_db',
//   password: 'root',
//   port: 5432,
// });

// client.connect();

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
          ssl:
            process.env.NODE_ENV === 'prod'
              ? {
                  rejectUnauthorized: false,
                }
              : null,
        };
      },
      inject: [config.KEY],
    }),
  ],
  providers: [
    // {
    //   // Basic connection to Postgres
    //   // provide: 'PG',
    //   // useFactory: (configService: ConfigType<typeof config>) => {
    //   //   const { postgresUrl } = configService;
    //   //   const client = new Client({
    //   //     connectionString: postgresUrl,
    //   //     ssl: {
    //   //       rejectUnauthorized: false,
    //   //     },
    //   //   });
    //   //   client.connect();
    //   //   return client;
    //   // },
    //   // inject: [config.KEY],
    // },
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
