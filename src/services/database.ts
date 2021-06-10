import { PrismaClient } from '@prisma/client';
import logger from '@services/logger';

export const prismaClient = new PrismaClient();

export const connectDatabase = async (): Promise<void> => {
  logger.info('connecting to database');
  await prismaClient.$connect();
  logger.info('connected to database');
};

export const disconnectDatabase = async (): Promise<void> => {
  logger.info('disconnecting database');
  await prismaClient.$disconnect();
  logger.info('disconnected database');
};
