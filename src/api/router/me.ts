import { deleteMeController } from '~/api/controllers/me/delete-me.koa.controller';
import { getMeController } from '~/api/controllers/me/get-me.koa.controller';
import { getMyActivitiesController } from '~/api/controllers/me/my-activities/get-me-activities.koa.controller';
import { getMyFollowedShopsController } from '~/api/controllers/me/my-followed-shops/get-my-followed-shops.koa.controller';
import { patchMeController } from '~/api/controllers/me/patch-me.koa.controller';
import { postNewFollowedShopController } from '~/api/controllers/me/my-followed-shops/post-new-followed-shops.koa.controller';
import { userIsAuthenticated } from '~/api/middlewares/user/user-is-authenticated';
import Router from 'koa-router';

export const meRouter = new Router();

meRouter
  .use(userIsAuthenticated)
  .get('/', getMeController)
  .patch('/', patchMeController)
  .delete('/', deleteMeController)
  .get('/activities', getMyActivitiesController)
  // .get('/notifications', )
  .get('/followed-shops', getMyFollowedShopsController)
  .post('/followed-shops', postNewFollowedShopController);
