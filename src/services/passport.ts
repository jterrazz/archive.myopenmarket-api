import passport from 'koa-passport';
import { Strategy as LocalStrategy } from 'passport-local';

import { signInWithPassword, signUp } from '@controllers/authentication.controller';

passport.serializeUser(async (user, done) => {
  try {
    await done(null, user.id);
  } catch (err) {
    done(err);
  }
});

passport.deserializeUser(async (id, done) => {
  try {
    await done(null, { id });
  } catch (err) {
    done(err);
  }
});

/*
 * STRATEGY: Username/password
 */

passport.use(
  'signup',
  new LocalStrategy(
    { passReqToCallback: true, usernameField: 'email' },
    async (req, username, password, done) => {
      try {
        const userRecord = await signUp(req.body);
        await done(null, userRecord);
      } catch (err) {
        done(err);
      }
    },
  ),
);

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
