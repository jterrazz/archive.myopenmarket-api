import Koa from 'koa';

import { createApp } from '~/api/app';
import { createConnection } from 'typeorm';
import databaseConfig from '../../../ormconfig';

let connection;

export const startInMemoryApp = async (): Promise<Koa> => {
  connection = await createConnection({
    ...databaseConfig,
    database: ':memory:',
    logging: true,
    type: 'sqlite',
  });
  await connection.synchronize();

  return createApp();
};

export const stopInMemoryApp = async (): Promise<void> => {
  await connection.close();
};
