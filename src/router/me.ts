import Router from 'koa-router';
import { deleteMeController, updateMeController } from '@controllers/user';

export const meRouter = new Router();

meRouter
    // .use(isLoggedIn)
    .patch('/', updateMeController)
    .delete('/', deleteMeController);

export default meRouter;
