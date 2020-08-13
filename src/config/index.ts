require('dotenv').config(); // loads environment variables from a .env file
import config from 'config'; // gets data from the root config folder https://github.com/lorenwest/node-config/wiki
import * as Joi from '@hapi/joi';

const _buildAndVerifyConfigFromYml = (ymlSection, joiSchema) => {
    const configFromYml = config.get(ymlSection);
    const { error, value: envValues } = joiSchema.validate(configFromYml);
    if (error) {
        console.error(`[config] Environment variable error: ${error.message}`);
        process.exit(1);
    }
    return envValues;
};

// Config objects

export const databaseConfig = _buildAndVerifyConfigFromYml(
    'database',
    Joi.object({
        mongo: Joi.object({
            url: Joi.string(),
        }).required(),
    }).required(),
);

export const apiConfig = _buildAndVerifyConfigFromYml(
    'api',
    Joi.object({
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
            'jwt-signature': Joi.string().required(),
        }).required(),
    }).required(),
);
apiConfig.isProd = apiConfig.env == 'production';

export const servicesConfig = _buildAndVerifyConfigFromYml(
    'services',
    Joi.object({
        elastic: Joi.object({
            'apm-url': Joi.string(),
            'apm-secret': Joi.string(),
            'cloud-id': Joi.string(),
            'log-api-id': Joi.string(),
            'log-api-key': Joi.string(),
        }).allow(null),
        mixpanel: Joi.object({
            secret: Joi.string(),
        }).allow(null),
    }).required(),
);
