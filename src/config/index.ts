import * as Joi from '@hapi/joi';
import { TomConsole, ConsoleLevel } from '@tom';

const tomConsole = new TomConsole('CONFIG');

const envSchema = Joi.object({
    ENV: Joi.string().default('development'),
    LOGS: Joi.number().default(0),

    // SERVER
    SERVER_PORT: Joi.number().default(3000),

    // DATABASE
    DATABASE_HOST: Joi.string().default('127.0.0.1'),
})
    .unknown()
    .required();

const { error, value: envValues } = envSchema.validate(process.env);

if (error) {
    tomConsole.print(`Environment variable error: ${error.message}`, ConsoleLevel.ERROR);
    process.exit(1);
}

tomConsole.levelThreshold = envValues.LOGS;

export default envValues;
