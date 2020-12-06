require('dotenv').config(); // loads environment variables from a .env file
import config from 'config'; // gets data from the root config folder https://github.com/lorenwest/node-config/wiki
import * as Joi from '@hapi/joi';
import 'joi-extract-type';

const _buildAndVerifyConfigFromYml = (
    configKey: string,
    joiSchema: Joi.Schema,
    modifyFromValuesCallback?: (envValues: any) => object,
) => {
    const configFromYml = config.get(configKey);
    const { error, value: envValues } = joiSchema.validate(configFromYml);

    if (error) {
        console.error(`[config] Environment variable error: ${error.message}`);
        process.exit(1);
    }
    if (modifyFromValuesCallback) {
        return {
            ...envValues,
            ...modifyFromValuesCallback(envValues),
        };
    }

    return envValues;
};

// API

const apiConfigSchema = Joi.object({
    env: Joi.string().required(),
    version: Joi.string().required(),
    logs: Joi.object({
        local: Joi.number().required(),
        distant: Joi.number().required(),
    }).required(),
    http: Joi.object({
        port: Joi.number().required(),
    }).required(),
    auth: Joi.object({
        jwtSecret: Joi.string().required(),
        sessionSecret: Joi.string().required(),
    }).required(),
    security: Joi.object({
        cors: Joi.string(),
    }).required(),
}).required();

type ApiConfigEnv = Joi.extractType<typeof apiConfigSchema>;

export interface ApiConfig extends ApiConfigEnv {
    isProd: boolean;
}

export const apiConfig: Readonly<ApiConfig> = _buildAndVerifyConfigFromYml(
    'api',
    apiConfigSchema,
    (envVariables) => ({
        isProd: envVariables.env === 'production',
    }),
);

// SERVICES

const servicesConfigSchema = Joi.object({
    sentry: Joi.object({
        dsn: Joi.string(),
    }).allow(null),
    mixpanel: Joi.object({
        secret: Joi.string(),
    }).allow(null),
}).required();

export type ServicesConfig = Joi.extractType<typeof servicesConfigSchema>;

export const servicesConfig: Readonly<ServicesConfig> = _buildAndVerifyConfigFromYml(
    'services',
    servicesConfigSchema,
);
