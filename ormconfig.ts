// https://github.com/typeorm/typeorm/blob/master/docs/using-ormconfig.md#which-configuration-file-is-used-by-typeorm
import { databaseConfig } from '@config';

const databaseConnection = databaseConfig.url
  ? { url: databaseConfig.url }
  : databaseConfig.connection;

const ormConfig = {
  ...databaseConnection,
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migrations',
  },
  entities: [__dirname + '/src/**/*.entity{.ts,.js}'],
  logging: databaseConfig.logging,
  migrations: [__dirname + '/src/migrations/*.ts'],
  ssl: databaseConfig.url ? { rejectUnauthorized: false } : false,
  subscribers: [__dirname + '/src/subscribers/*.ts'],
  synchronize: false,
  type: databaseConfig.type,
};

export default ormConfig;
