import Router from 'koa-router';
import { getUserController } from '@controllers/user';

const userRouter = new Router();

userRouter.post('/:userId', getUserController);

export default userRouter;
