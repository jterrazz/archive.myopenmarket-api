import passport from 'koa-passport';
import Router from 'koa-router';

import '@services/authentication/strategies';
import { logoutController, successAuthController } from '~/controllers/authentication';
import { isAuthenticated } from '@middlewares/authentication';

const authRouter = new Router();

authRouter
    .post('/logout', isAuthenticated, logoutController)
    // .post('/reset-password-email', resetPasswordEmailController)
    // .post('/reset-password', resetPasswordController)

    // Local
    .post('/signup', passport.authenticate('signup'), successAuthController)
    .post('/signin', passport.authenticate('signin'), successAuthController);

export default authRouter;
