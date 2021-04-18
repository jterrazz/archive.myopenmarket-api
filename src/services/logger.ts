// This is imported by a lot of files, avoid importing other code here
import { apiConfig, local } from '@config';
import winston from 'winston';

const WinstonLevels = ['error', 'warn', 'info', 'debug', 'verbose'];

enum LevelColors {
  error = '\x1b[31m',
  warn = '\x1b[35m',
  info = '\x1b[34m',
  debug = '\x1b[37m',
  verbose = '\x1b[37m',
}

export const winstonLogger = winston.createLogger({
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
    format: local ? localFormat : winston.format.json(),
  }),
);

/**
 * Logger
 */

export class Logger {
  private static _getStack(): NodeJS.CallSite[] | null {
    const originalPrepareStackTrace = Error.prepareStackTrace;

    Error.prepareStackTrace = function (_, stack) {
      return stack;
    };

    const err = new Error();
    const stack = (err.stack as unknown) as NodeJS.CallSite[] | null;

    Error.prepareStackTrace = originalPrepareStackTrace;

    return stack;
  }

  private static _getCallerFile(): string | undefined {
    const stack = Logger._getStack();
    const currentFile = stack?.shift()?.getFileName();

    while (stack?.length) {
      const callerFile = stack?.shift()?.getFileName();

      if (currentFile !== callerFile) return callerFile?.split('/').pop()?.replace('.ts', '');
    }
  }

  private static _buildMessage(message) {
    return {
      category: Logger._getCallerFile(),
      message: message,
    };
  }

  /**
   * Logging methods
   */

  error(message: unknown): void {
    winstonLogger.error(Logger._buildMessage(message));
  }
  warn(message: unknown): void {
    winstonLogger.warn(Logger._buildMessage(message));
  }
  info(message: unknown): void {
    winstonLogger.info(Logger._buildMessage(message));
  }
  debug(message: unknown): void {
    winstonLogger.debug(Logger._buildMessage(message));
  }
  verbose(message: unknown): void {
    winstonLogger.verbose(Logger._buildMessage(message));
  }
}

export default new Logger();
