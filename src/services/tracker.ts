import { ExtendableContext } from 'koa';
import { servicesConfig } from '@config';
import Mixpanel from 'mixpanel';
import logger from '@services/logger';

const mixpanelSecret = servicesConfig.mixpanel?.secret;

const EVENTS = {
  request: {
    deleteMe: 'delete-me',
    getApiState: 'get-api-state',
    getMe: 'get-me',
    getMyFollowedShops: 'get-my-followed-shops',
    getShop: 'get-shop',
    getUser: 'get-user',
    patchMe: 'patch-me',
    postNewFollowedShop: 'post-new-followed-shop',
    postOrder: 'post-order',
    postSignIn: 'post-sign-in',
    postSignUp: 'post-sign-up',
  },
};

class Tracker {
  private _tracker: Mixpanel.Mixpanel;
  private readonly _userProps: Record<string, string> = {};

  constructor(ctx: ExtendableContext) {
    if (!mixpanelSecret) return;

    this._tracker = Mixpanel.init(mixpanelSecret, {
      protocol: 'https',
    });
    this._setUserPropsFromCtx(ctx);
  }

  private _setUserPropsFromCtx(ctx: ExtendableContext): void {
    if (ctx.state.user) this._userProps.distinct_id = ctx.state.user.id;
    if (ctx.request.ip) this._userProps.ip = ctx.request.ip;
  }

  private _emit(name: string, props?: Record<string, unknown>): void {
    let log = `sending event <${name}> - <props:${JSON.stringify(props)}>`;
    if (!mixpanelSecret) log += ' (stopped)';
    logger.debug(log);

    if (!mixpanelSecret) return;

    this._tracker.track(name, {
      ...this._userProps,
      ...props,
    });
  }

  // Trackers

  requestGetApiState(): void {
    this._emit(EVENTS.request.getApiState);
  }

  requestGetSignIn(): void {
    this._emit(EVENTS.request.postSignIn);
  }

  requestGetSignUp(): void {
    this._emit(EVENTS.request.postSignUp);
  }

  requestGetUser(): void {
    this._emit(EVENTS.request.getUser);
  }

  requestGetMe(): void {
    this._emit(EVENTS.request.getMe);
  }

  requestPatchMe(): void {
    this._emit(EVENTS.request.patchMe);
  }

  requestDeleteMe(): void {
    this._emit(EVENTS.request.deleteMe);
  }

  requestGetShop(): void {
    this._emit(EVENTS.request.getShop);
  }

  requestGetMyFollowedShops(): void {
    this._emit(EVENTS.request.getMyFollowedShops);
  }

  requestPostNewFollowedShop(): void {
    this._emit(EVENTS.request.postNewFollowedShop);
  }

  requestPostOrder(): void {
    this._emit(EVENTS.request.postOrder);
  }
}

export default Tracker;
