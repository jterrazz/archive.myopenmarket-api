import { MongoMemoryServer } from 'mongodb-memory-server';
import { databaseConfig } from '@config';
import { createApp, destroyApp } from '~/app';

const mongod = new MongoMemoryServer();

export const startTestApp = async () => {
  databaseConfig.mongo.url = await mongod.getConnectionString();
  return await createApp();
};

export const stopTestApp = async () => {
  await mongod.stop();
  await destroyApp();
};
