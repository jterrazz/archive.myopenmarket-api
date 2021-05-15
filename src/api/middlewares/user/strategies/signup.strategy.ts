import { Strategy as LocalStrategy } from 'passport-local';
import { signUpWithPassword } from '@controllers/authentication/sign-up-with-password.controller';
import passport from 'koa-passport';

passport.use(
  'signup',
  new LocalStrategy(
    { passReqToCallback: true, usernameField: 'email' },
    async (req, username, password, done) => {
      try {
        const userRecord = await signUpWithPassword(req.body);
        await done(null, userRecord);
      } catch (err) {
        done(err);
      }
    },
  ),
);
