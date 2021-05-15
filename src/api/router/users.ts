import { getUserController } from '~/api/controllers/users/get-user.koa.controller';
import Router from 'koa-router';

export const usersRouter = new Router();

usersRouter.get('/:userId', getUserController);
