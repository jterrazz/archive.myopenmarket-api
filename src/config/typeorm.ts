import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
    type: 'postgres',

    // Connexion
    host: process.env.POSTGRES_HOST || '127.0.0.1',
    port: Number(process.env.POSTGRES_PORT) || 5432,
    username: process.env.POSTGRES_USER || 'dev_user',
    password: process.env.POSTGRES_PASSWORD || 'dev_password',
    database: process.env.POSTGRES_DB || 'tom-db',

    // Files
    entities: [__dirname + '/../entity/**/*.ts'],
    migrations: [__dirname + '/../migration/**/*.ts'],
    subscribers: [__dirname + '/../subscriber/**/*.ts'],
    cli: {
        entitiesDir: 'src/entity',
        migrationsDir: 'src/migration',
        subscribersDir: 'src/subscriber',
    },

    // Other settings
    synchronize: false,
    logging: true,
    maxQueryExecutionTime: 100,
};

export = config;
