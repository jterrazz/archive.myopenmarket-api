import Router from 'koa-router';
import passport from 'koa-passport';

import '@middlewares/user/passport';
import { authenticationSuccessController } from '~/api/controllers/authentication/authentication-success.koa.controller';
import { logoutController } from '~/api/controllers/authentication/logout.koa.controller';
import { userIsAuthenticated } from '~/api/middlewares/user/user-is-authenticated';

export const authRouter = new Router();

authRouter
  .post('/logout', userIsAuthenticated, logoutController)
  // .post('/password/reset/email', resetPasswordEmailController)
  // .post('/password/reset/email', resetPasswordEmailController)
  // .post('/reset-password', resetPasswordController)

  // Local
  .post('/signup', passport.authenticate('signup'), authenticationSuccessController)
  .post('/signin', passport.authenticate('signin'), authenticationSuccessController);
