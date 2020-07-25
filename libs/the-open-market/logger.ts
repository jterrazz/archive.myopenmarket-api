// This file is imported by a lot of files, avoir importing other TClasses here

import { Context } from 'vm';

import { apiConfig } from '@config';

enum TLoggerLevel {
    DEBUG = 0,
    INFO = 1,
    WARN = 2,
    ERROR = 3,
}

export default class TLogger {
    LEVEL = TLoggerLevel;

    _logger;
    _identifier: string;
    _localThreshold: TLoggerLevel = apiConfig.logs.local;
    _distantThreshold: TLoggerLevel = apiConfig.logs.distant;

    constructor(identifier?: string, user?: object) {
        this._identifier = identifier.split(/[\\/]/).pop();

        // this._logger = config.isServerBuild
        //     ? new Node(config.TIMBER_API_KEY, config.TIMBER_SOURCE_ID)
        //     : new Browser(config.TIMBER_API_KEY, config.TIMBER_SOURCE_ID);

        // if (user) this._logger.use(TLogger._buildLoggerUserMiddleware(user));
    }

    // static _buildLoggerUserMiddleware(user: Context): Function {
    //     const loggerMiddleware = async (log: ITimberLog): Promise<ITimberLog> => {
    //         return {
    //             ...log,
    //             user,
    //         };
    //     };
    //     return loggerMiddleware;
    // }

    /**
     * Display messages on the console
     */

    _log(level: TLoggerLevel, message: string | Error, data?: any): void {
        const logDistantIsActive = this._distantThreshold <= level;
        const logLocalIsActive = this._localThreshold <= level;
        console.log(message);

        // if (message instanceof Error) {
        //     data = message.stack;
        //     message = message.message;
        // }
        //
        // if (logDistantIsActive) {
        //     const loggerLevelName = TLoggerLevel[level].toLowerCase();
        //     this._logger[loggerLevelName](message, data as Context)
        //         .then()
        //         .catch(console.error);
        // }
        //
        // const colors = ['\x1b[37m', '\x1b[34m', '\x1b[35m', '\x1b[31m'];
        //
        // if (logLocalIsActive) {
        //     message = colors[level] + message + '\x1b[0m';
        //     if (this._identifier) message = `\x1b[2m\x1b[37m[${this._identifier}]\x1b[0m ${message}`;
        //     console.log(message);
        //     if (data) {
        //         console.log(data);
        //     }
        // }
    }

    /**
     * Shortcuts
     */

    debug(message: string | Error, data?: object): void {
        this._log(this.LEVEL.DEBUG, message, data);
    }

    info(message: string | Error, data?: object): void {
        this._log(this.LEVEL.INFO, message, data);
    }

    warn(message: string | Error, data?: object): void {
        this._log(this.LEVEL.WARN, message, data);
    }

    error(message: string | Error, data?: object): void {
        this._log(this.LEVEL.ERROR, message, data);
    }
}
