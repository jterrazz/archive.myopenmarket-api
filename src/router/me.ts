import Router from 'koa-router';
import {
  deleteMeController,
  getMeController,
  patchMeController,
  getMyFollowedShopsController,
  postFollowShopController,
  getMyActivitiesController,
} from '@controllers/me.controller';
import { isAuthenticated } from '@middlewares/authentication';

export const meRouter = new Router();

meRouter
  .use(isAuthenticated)
  .get('/', getMeController)
  .patch('/', patchMeController)
  .delete('/', deleteMeController)
  .get('/activities', getMyActivitiesController)
  .get('/followed-shops', getMyFollowedShopsController)
  .post('/followed-shops', postFollowShopController);

export default meRouter;
