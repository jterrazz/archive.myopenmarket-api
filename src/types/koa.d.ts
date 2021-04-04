import * as Koa from 'koa'; // To keep for importing default Koa type
import Tracker from '../services/tracker';
import { Logger } from '../services/logger';
import { User } from '@entities/user.entity';

declare module 'koa' {
  interface ExtendableContext {
    tracker: Tracker;
    logger: Logger;
    state: {
      user: User;
    };
  }
}
