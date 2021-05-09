// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as Koa from 'koa'; // To keep for importing default Koa type
import { Logger } from '@services/logger';
import { User } from '@entities/user.entity';
import { UserSession } from '@entities/user-session.entity';
import Tracker from '../services/tracker';

export interface RawJson {
  [key: string]: RawJson;
}

declare module 'koa' {
  interface ExtendableContext {
    tracker: Tracker;
    logger: Logger;
    state: {
      user: User;
      userSession: UserSession;
    };
  }

  interface Request {
    body?: RawJson;
    rawBody: string;
  }
}
