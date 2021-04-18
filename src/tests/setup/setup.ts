jest.mock('../../services/logger', () => ({
  debug: console.log,
  error: console.log,
  http: console.log,
  info: console.log,
  verbose: console.log,
  warn: console.log,
}));

import '../../services/logger';
