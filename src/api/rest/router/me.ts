import Router from 'koa-router';
import {
    deleteMeController,
    getMeController,
    updateMeController,
} from '~/api/rest/controllers/user';
import { isAuthenticated } from '@middlewares/authentication';

export const meRouter = new Router();

meRouter
    .use(isAuthenticated)
    .get('/', getMeController)
    .patch('/', updateMeController)
    .delete('/', deleteMeController);

export default meRouter;
