import Mixpanel from 'mixpanel';
import { servicesConfig } from '@config';
import logger from '@services/logger';

const mixpanelSecret = servicesConfig.mixpanel?.secret;

const EVENTS = {
  request: {
    getApiState: 'get-api-state',
    postSignIn: 'post-sign-in',
    postSignUp: 'post-sign-up',
    getShop: 'get-shop',
    getUser: 'get-user',
    getMe: 'get-me',
    patchMe: 'patch-me',
    deleteMe: 'delete-me',
    getMyFollowedShops: 'get-my-followed-shops',
    insertFollowedShops: 'insert-followed-shops',
  },
};

class Tracker {
  private _tracker: Mixpanel.Mixpanel;
  private readonly _userProps: any = {};

  constructor(ctx) {
    if (!mixpanelSecret) return;

    this._tracker = Mixpanel.init(mixpanelSecret, {
      protocol: 'https',
    });
    this.setUserPropsFromCtx(ctx);
  }

  setUserPropsFromCtx(ctx) {
    // eslint-disable-next-line @typescript-eslint/camelcase
    if (ctx.user) this._userProps.distinct_id = ctx.user.id;
    if (ctx.request.ip) this._userProps.ip = ctx.request.ip;
  }

  _emit(name: string, props: object = {}) {
    let log = `New event ${name} - ${JSON.stringify(props)}`;
    if (!mixpanelSecret) log += ' (skipped)';
    logger.http(log);

    if (!mixpanelSecret) return;

    return this._tracker.track(name, {
      ...this._userProps,
      ...props,
    });
  }

  // Trackers

  requestGetApiState() {
    this._emit(EVENTS.request.getApiState);
  }

  requestGetSignIn() {
    this._emit(EVENTS.request.postSignIn);
  }

  requestGetSignUp() {
    this._emit(EVENTS.request.postSignUp);
  }

  requestGetUser() {
    this._emit(EVENTS.request.getUser);
  }

  requestGetMe() {
    this._emit(EVENTS.request.getMe);
  }

  requestPatchMe() {
    this._emit(EVENTS.request.patchMe);
  }

  requestDeleteMe() {
    this._emit(EVENTS.request.deleteMe);
  }

  requestGetShop() {
    this._emit(EVENTS.request.getShop);
  }

  requestGetMyFollowedShops() {
    this._emit(EVENTS.request.getMyFollowedShops);
  }

  requestInsertFollowedShops() {
    this._emit(EVENTS.request.insertFollowedShops);
  }
}

export default Tracker;
