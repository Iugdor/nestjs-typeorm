const rootDir = process.env.NODE_ENV === 'dev' ? 'src' : 'dist';
module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: false,
  migrations: [`${rootDir}/database/migrations/*.ts`],
  migrationsTableName: 'migrations',
  entities: [`${rootDir}/**/*.entity.ts`],
  cli: {
    migrationsDir: `${rootDir}/database/migrations`,
  },
  ssl: {
    rejectUnauthorized: false,
  },
};
