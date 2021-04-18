import Router from 'koa-router';
import passport from 'koa-passport';

import '@services/passport';
import { isAuthenticated } from '@middlewares/authentication';
import { logoutController, successAuthController } from '@controllers/authentication.controller';

export const authRouter = new Router();

authRouter
  .post('/logout', isAuthenticated, logoutController)
  // .post('/password/reset/email', resetPasswordEmailController)
  // .post('/password/reset/email', resetPasswordEmailController)
  // .post('/reset-password', resetPasswordController)

  // Local
  .post('/signup', passport.authenticate('signup'), successAuthController)
  .post('/signin', passport.authenticate('signin'), successAuthController);
