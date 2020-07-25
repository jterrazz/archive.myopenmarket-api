import apm from 'elastic-apm-node';
import { servicesConfig } from '@config';

const apmClient = apm;

if (servicesConfig.elastic) {
    apm.start({
        // Override service name from package.json
        // Allowed characters: a-z, A-Z, 0-9, -, _, and space
        // serviceName: null,

        secretToken: servicesConfig.elastic['apm-secret'],
        serverUrl: servicesConfig.elastic['apm-url'],

        // captureBody: 'all',
        // logLevel: 'info',
        logUncaughtExceptions: true,
    });
}

export default apmClient;
