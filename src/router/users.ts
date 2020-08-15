import Router from 'koa-router';
import { getUserController } from '@controllers/user';

const userRouter = new Router();

userRouter.get('/:userId', getUserController);

export default userRouter;
