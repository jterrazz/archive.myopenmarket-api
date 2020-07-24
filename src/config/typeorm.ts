// Called by typeorm-cli and node

import { ConnectionOptions } from 'typeorm';
import { User } from '../models';
import { databaseConfig } from './index';

const config: ConnectionOptions = {
    type: 'postgres',

    // Connexion
    ...databaseConfig.postgres,

    // Files
    entities: [User],
    migrations: [__dirname + '/../migrations/**/*.{js,ts}'],
    subscribers: [__dirname + '/../subscriber/**/*.{js,ts}'],
    cli: {
        entitiesDir: 'src/models',
        migrationsDir: 'src/migrations',
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
