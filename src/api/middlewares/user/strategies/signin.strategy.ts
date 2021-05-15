import { Strategy as LocalStrategy } from 'passport-local';
import { signInWithPassword } from '@controllers/authentication/sign-in-with-password.controller';
import passport from 'koa-passport';

passport.use(
  'signin',
  new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      const userRecord = await signInWithPassword(email, password);
      await done(null, userRecord);
    } catch (err) {
      done(err);
    }
  }),
);
