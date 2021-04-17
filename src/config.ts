import config from 'config';
import * as z from 'zod';

/**
 * API config
 */

const apiConfigSchema = z.object({
  env: z.string(),
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
