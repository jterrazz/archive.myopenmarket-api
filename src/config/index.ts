import * as Joi from '@hapi/joi';
import { TLogger } from '@tom';

const logger = new TLogger(__filename);

const envSchema = Joi.object({
    ENV: Joi.string().default('development'),

    // SERVER
    SERVER_PORT: Joi.number().default(3000),

    // DATABASE
    DATABASE_HOST: Joi.string().default('127.0.0.1'),
    DATABASE_PORT: Joi.number().default(4242),
})
    .unknown()
    .required();

const { error, value: envValues } = envSchema.validate(process.env);

if (error) {
    logger.error(`Environment variable error: ${error.message}`);
    process.exit(1);
}

export default envValues;
