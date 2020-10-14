import Mixpanel from 'mixpanel';
import { servicesConfig } from '@config';
import Logger from '@services/logger';

const logger = new Logger(__filename);
const mixpanelSecret = servicesConfig.mixpanel?.secret;

export const EVENTS = {
    routes: {
        signIn: 'post-signin',
        signUp: 'post-signup',
        getUser: 'get-user',
        getApiState: 'get-api-state',
        getAuthenticatedUser: 'get-authenticated-user',
        patchAuthenticatedUser: 'patch-authenticated-user',
        deleteAuthenticatedUser: 'delete-authenticated-user',
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

    track(name: string, props: object = {}) {
        let log = `New event ${name} - ${JSON.stringify(props)}`;
        if (!mixpanelSecret) log += ' (skipped)';
        logger.http(log);

        if (!mixpanelSecret) return;

        return this._tracker.track(name, {
            ...this._userProps,
            ...props,
        });
    }
}

export default Tracker;
