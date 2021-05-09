import { createConnection } from 'typeorm';
import logger from '@services/logger';

export const connectToDatabase = async (): Promise<void> => {
  logger.info('connecting to database');
  await createConnection();
  logger.info('connected to database');
};
