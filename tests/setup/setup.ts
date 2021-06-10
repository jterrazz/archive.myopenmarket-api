jest.mock('../../services/logger', () => ({
  debug: console.log,
  error: console.log,
  info: console.log,
  verbose: console.log,
  warn: console.log,
}));
import '@services/logger';

jest.mock('../../services/queue');
import '@services/queue';
