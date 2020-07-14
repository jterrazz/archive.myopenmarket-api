import { ConnectionOptions } from 'typeorm';
import { User } from '../model';

const config: ConnectionOptions = {
    type: 'postgres',

    // Connexion
    host: process.env.POSTGRES_HOST || '127.0.0.1',
    port: Number(process.env.POSTGRES_PORT) || 5432,
    username: process.env.POSTGRES_USER || 'dev_user',
    password: process.env.POSTGRES_PASSWORD || 'dev_password',
    database: process.env.POSTGRES_DB || 'tom-db',

    // Files
    entities: [User],
    migrations: [__dirname + '/../migration/**/*.{js,ts}'],
    subscribers: [__dirname + '/../subscriber/**/*.{js,ts}'],
    cli: {
        entitiesDir: 'src/model',
        migrationsDir: 'src/migration',
        subscribersDir: 'src/subscriber',
    },

    // Other settings
    synchronize: false,
    logging: process.env.LOGS_LOCAL_LEVEL == '0',
    maxQueryExecutionTime: 100,
    extra: {
        // connectionLimit: 20, // Use this to use larger connection pool - Defaults to 10
    },
};

export = config;
