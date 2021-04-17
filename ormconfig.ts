// https://github.com/typeorm/typeorm/blob/master/docs/using-ormconfig.md#which-configuration-file-is-used-by-typeorm
import config from 'config';

const databaseConfig = config.get('database');
const databaseConnection = databaseConfig.url
  ? { url: databaseConfig.url }
  : databaseConfig.connection;

const ormConfig = {
  ...databaseConnection,
  type: databaseConfig.type,
  synchronize: false,
  logging: databaseConfig.logging,
  entities: [__dirname + '/src/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/src/migrations/*.ts'],
  subscribers: [__dirname + '/src/subscribers/*.ts'],
  ssl: databaseConfig.url ? { rejectUnauthorized: false } : false,
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migrations',
  },
};

export default ormConfig;
