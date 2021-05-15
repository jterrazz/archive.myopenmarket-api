import { Context } from 'koa';
import { User } from './user.entity';

export class UserSession {
  private _ctx: Context;

  constructor(ctx: Context) {
    this._ctx = ctx;
  }

  get user(): User {
    return this._ctx.state.user;
  }

  get ipAddress(): string {
    return this._ctx.request.ip;
  }
}
