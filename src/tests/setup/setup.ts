jest.mock('../../services/logger', () => ({
  error: console.log,
  warn: console.log,
  info: console.log,
  http: console.log,
  verbose: console.log,
  debug: console.log,
}));

import '../../services/logger';
