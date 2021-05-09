process.env['NODE_CONFIG_DIR'] = __dirname + '/';
import * as z from 'zod';
import config from 'config';

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
  auth: z.object({
    jwtSecret: z.string(),
    sessionSecret: z.string(),
  }),
  http: z.object({
    port: z.string(),
  }),
  logs: z.object({
    external: z.string(),
    internal: z.string(),
  }),
  security: z.object({
    cors: z.array(z.string()),
  }),
  version: z.string(),
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
  mixpanel: z
    .object({
      secret: z.string().optional(),
    })
    .nullable(),
  sentry: z
    .object({
      dsn: z.string().optional(),
    })
    .nullable(),
});

export const servicesConfig = servicesConfigSchema.parse(config.get('services'));

/**
 * Database
 */

const databaseConfigSchema = z.object({
  connection: z
    .object({
      database: z.string().optional(),
      host: z.string().optional(),
      password: z.string().optional(),
      port: z.string().optional(),
      username: z.string().optional(),
    })
    .optional(),
  logging: z.boolean(),
  type: z.string(),
  url: z.string().optional(),
});

export const databaseConfig = databaseConfigSchema.parse(config.get('database'));

/**
 * Store
 */

const storeConfigSchema = z.object({
  url: z.string(),
});

export const storeConfig = storeConfigSchema.parse(config.get('store'));
