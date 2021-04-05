// https://github.com/typeorm/typeorm/blob/master/docs/using-ormconfig.md#which-configuration-file-is-used-by-typeorm

const connection = process.env.DATABASE_URL
  ? {
      url: process.env.DATABASE_URL,
    }
  : {
      host: process.env.DATABASE_HOST || 'localhost',
      port: 5432,
      username: 'admin_user',
      password: 'admin_password',
      database: 'open_market_api',
    };

const config = {
  ...connection,
  type: 'postgres',
  synchronize: false,
  logging: false,
  entities: [__dirname + '/src/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/src/migrations/*.ts'],
  subscribers: [__dirname + '/src/subscribers/*.ts'],
  ssl: { rejectUnauthorized: false },
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migrations',
  },
};

export default config;
