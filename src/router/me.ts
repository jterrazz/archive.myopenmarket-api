import Router from 'koa-router';
import { deleteMeController, updateMeController } from '@controllers/user';
import { isAuthenticated } from '~/middlewares/authentication';

export const meRouter = new Router();

meRouter.use(isAuthenticated).patch('/', updateMeController).delete('/', deleteMeController);

export default meRouter;
