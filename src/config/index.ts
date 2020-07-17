import * as Joi from '@hapi/joi';
import { TLogger } from '@tom';

const logger = new TLogger(__filename);

const envSchema = Joi.object({
    ENV: Joi.string().default('development'),
    API_VERSION: Joi.string().default('0.0.1'),

    // SERVER
    PORT: Joi.number().default(3000),

    // DATABASE - Default values in ormconfig.ts
    POSTGRES_HOST: Joi.string(),
    POSTGRES_PORT: Joi.number(),
    POSTGRES_USER: Joi.string(),
    POSTGRES_PASSWORD: Joi.string(),
    POSTGRES_DB: Joi.string(),

    JWT_SIGNATURE: Joi.string().default('wow'),
})
    .unknown()
    .required();

const { error, value: envValues } = envSchema.validate(process.env);

if (error) {
    logger.error(`Environment variable error: ${error.message}`);
    process.exit(1);
}

export default envValues;
