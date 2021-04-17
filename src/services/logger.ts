// This is imported by a lot of files, avoid importing other code
import winston from 'winston';
import { apiConfig } from '@config';

const WinstonLevels = ['error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly'];

enum LevelColors {
  error = '\x1b[31m',
  warn = '\x1b[35m',
  info = '\x1b[34m',
  http = '',
  verbose = '',
  debug = '\x1b[37m',
  silly = '\x1b[37m',
}

const winstonLogger = winston.createLogger({
  level: WinstonLevels[apiConfig.logs.internal],
});

/**
 * Format
 */

const localFormat = winston.format.printf((info) => {
  return LevelColors[info.level] + `[${info.category}] ${info.message} \x1b[0m`;
});

winstonLogger.add(
  new winston.transports.Console({
    format: localFormat,
  }),
);

/**
 * Logger
 */

export class Logger {
  _getCallerFile() {
    try {
      const err = new Error();

      Error.prepareStackTrace = function (err, stack) {
        return stack;
      };

      const stack = (err?.stack as unknown) as NodeJS.CallSite[] | null;
      const currentFile = stack?.shift()?.getFileName();

      while (err.stack?.length) {
        const stack = (err?.stack as unknown) as NodeJS.CallSite[] | null;
        const callerFile = stack?.shift()?.getFileName();

        if (currentFile !== callerFile) return callerFile?.split('/').pop()?.replace('.ts', '');
      }
    } catch (err) {}

    return undefined;
  }

  _buildMessage(message) {
    return {
      message: message,
      category: this._getCallerFile(),
    };
  }

  /**
   * Logging methods
   */

  error(message) {
    winstonLogger.error(this._buildMessage(message));
  }
  warn(message) {
    winstonLogger.warn(this._buildMessage(message));
  }
  info(message) {
    winstonLogger.info(this._buildMessage(message));
  }
  http(message) {
    winstonLogger.http(this._buildMessage(message));
  }
  verbose(message) {
    winstonLogger.verbose(this._buildMessage(message));
  }
  debug(message) {
    winstonLogger.debug(this._buildMessage(message));
  }
}

export default new Logger();
