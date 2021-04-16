require('dotenv').config(); // load environment variables from the .env file
import config from 'config';
import * as z from 'zod';

/**
 * API config
 */

const apiConfigSchema = z.object({
  env: z.string(),
  version: z.string(),
  logs: z.object({
    local: z.number(),
    distant: z.number(),
  }),
  http: z.object({
    port: z.number(),
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

const servicesConfigSchema = z
  .object({
    sentry: z
      .object({
        dsn: z.string().optional(),
      })
      .optional(),
    mixpanel: z
      .object({
        secret: z.string().optional(),
      })
      .optional(),
  })
  .nullable();

export const servicesConfig = servicesConfigSchema.parse(config.get('services')) || {};
