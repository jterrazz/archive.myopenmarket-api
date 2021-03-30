import Router from 'koa-router';
import {
  deleteMeController,
  getMeController,
  updateMeController,
  getMyFollowedShopsController,
  followShopController,
} from '~/controllers/users';
import { isAuthenticated } from '@middlewares/authentication';

export const meRouter = new Router();

meRouter
  .use(isAuthenticated)
  .get('/', getMeController)
  .get('/followed-shops', getMyFollowedShopsController)
  .post('/followed-shops', followShopController)
  .patch('/', updateMeController)
  .delete('/', deleteMeController);

export default meRouter;
