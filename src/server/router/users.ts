import { getUserController } from '@controllers/user.controller';
import Router from 'koa-router';

export const usersRouter = new Router();

usersRouter.get('/:userId', getUserController);
