import Router from 'koa-router';
import { getUserController } from '@controllers/user.controller';

export const usersRouter = new Router();

usersRouter.get('/:userId', getUserController);
