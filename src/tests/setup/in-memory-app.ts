import { createApp, destroyApp } from '~/app';
import { createConnection } from 'typeorm';
import databaseConfig from '../../../ormconfig';

export const startInMemoryApp = async () => {
  const connection = await createConnection({
    ...databaseConfig,
    type: 'sqlite',
    database: ':memory:',
    logging: true,
  });
  await connection.synchronize();

  return await createApp();
};

export const stopInMemoryApp = async () => {
  // await mongod.stop();
  await destroyApp();
};