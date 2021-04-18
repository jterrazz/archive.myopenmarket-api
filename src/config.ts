import config from 'config';
import * as z from 'zod';

/**
 * Environment
 */

const environmentSchema = z.string();
export const environment = environmentSchema.parse(config.get('env'));

const localSchema = z.boolean();
export const local = localSchema.parse(Boolean(config.get('local')));

/**
 * API config
 */

const apiConfigSchema = z.object({
  version: z.string(),
  logs: z.object({
    internal: z.string(),
    external: z.string(),
  }),
  http: z.object({
    port: z.string(),
  }),
  auth: z.object({
    jwtSecret: z.string(),
    sessionSecret: z.string(),
  }),
  security: z.object({
    cors: z.string(),
  }),
});

export const apiConfig = apiConfigSchema.parse(config.get('api'));

/**
 * Environment
 */

const workerSchema = z.object({
  concurrency: z.string(),
});
export const workerConfig = workerSchema.parse(config.get('worker'));

/**
 * External services
 */

const servicesConfigSchema = z.object({
  sentry: z
    .object({
      dsn: z.string().optional(),
    })
    .nullable(),
  mixpanel: z
    .object({
      secret: z.string().optional(),
    })
    .nullable(),
});

export const servicesConfig = servicesConfigSchema.parse(config.get('services'));

/**
 * Database
 */

const databaseConfigSchema = z.object({
  type: z.string(),
  logging: z.boolean(),
  url: z.string().optional(),
  connection: z
    .object({
      host: z.string().optional(),
      port: z.string().optional(),
      username: z.string().optional(),
      password: z.string().optional(),
      database: z.string().optional(),
    })
    .optional(),
});

export const databaseConfig = databaseConfigSchema.parse(config.get('database'));

/**
 * Database
 */

const storeConfigSchema = z.object({
  url: z.string(),
});

export const storeConfig = storeConfigSchema.parse(config.get('store'));
