import Mixpanel from 'mixpanel';

import Logger from './logger';
import { servicesConfig } from '@config';

const mixpanel = Mixpanel.init(servicesConfig.mixpanel.secret);
const logger = new Logger(__filename);

enum EVENTS {
    GET_STATE = 'GET state',
    GET_HOME = 'GET home',
    GET_SEARCH = 'GET search',
    GET_PRODUCT = 'GET product',
    GET_USER = 'GET user',
}

export default class TTracker {
    private _tracker = mixpanel;
    EVENTS = EVENTS;

    constructor(user: any = {}) {
        /**
         * Mixpanel special props:
         * - $email: Needs $
         * - <date>: in ISO timestamp format (e.g. "2020-01-02T21:07:03Z")
         */

        this._tracker.people.set(user ? user.id : 'all', {
            ...user,
        });
    }

    track(name: EVENTS, data?: object): void {
        mixpanel.track(name, data);
        logger.info(`New event ${name}`, data);
    }
}
