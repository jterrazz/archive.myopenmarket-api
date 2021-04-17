import Koa from 'koa';

import { createApp } from '~/server/app';
import { createConnection } from 'typeorm';
import databaseConfig from '../../../ormconfig';

export const startInMemoryApp = async (): Promise<Koa> => {
  const connection = await createConnection({
    ...databaseConfig,
    type: 'sqlite',
    database: ':memory:',
    logging: true,
  });
  await connection.synchronize();

  return createApp();
};
