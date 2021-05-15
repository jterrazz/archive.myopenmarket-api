import './strategies/signin.strategy';
import './strategies/signup.strategy';
import passport from 'koa-passport';

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
