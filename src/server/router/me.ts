import {
  deleteMeController,
  getMeController,
  getMyActivitiesController,
  getMyFollowedShopsController,
  patchMeController,
  postNewFollowedShopController,
} from '@controllers/me.controller';
import { isAuthenticated } from '@middlewares/authentication';
import Router from 'koa-router';

export const meRouter = new Router();

meRouter
  .use(isAuthenticated)
  .get('/', getMeController)
  .patch('/', patchMeController)
  .delete('/', deleteMeController)
  .get('/activities', getMyActivitiesController)
  // .get('/notifications', getMyActivitiesController)
  .get('/followed-shops', getMyFollowedShopsController)
  .post('/followed-shops', postNewFollowedShopController);
