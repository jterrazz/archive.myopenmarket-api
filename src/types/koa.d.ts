import * as Koa from 'koa'; // To keep for importing default Koa type
import Tracker from '../services/tracker';
import { Logger } from '../services/logger';
import { User } from '@entities/user.entity';
import { UserSession } from '@entities/user-session.entity';

export interface RawJson {
  [key: string]: RawJson | string | number | object;
}

export interface ParsedJson {
  [key: string]: ParsedJson | string | number | object;
}

declare module 'koa' {
  interface ExtendableContext {
    tracker: Tracker;
    logger: Logger;
    state: {
      user: User;
      userSession: UserSession;
    };
    body: RawJson | string | number | object;
  }
}
