export const apm = require('elastic-apm-node').start({
  environment: 'production',
  secretToken: '7swA10A8ZNz9kCMcZX',
  serverUrl: 'https://801d26251ea14db99915db5b6840a534.apm.eu-west-2.aws.cloud.es.io:443',
});
