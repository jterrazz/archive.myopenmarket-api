import passport from 'koa-passport';
import * as Joi from '@hapi/joi';
import { Strategy as LocalStrategy } from 'passport-local';

import AuthenticationService from '@services/authentication/index';

passport.serializeUser(async (user, done) => {
    try {
        await done(null, user._id);
    } catch (err) {
        done(err);
    }
});

passport.deserializeUser(async (id, done) => {
    try {
        await done(null, { _id: id });
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
                // TODO Centralise this
                const userSchema = Joi.object()
                    .keys({
                        email: Joi.string().email().required(),
                        password: Joi.string().min(8).max(100).required(),
                        firstName: Joi.string().max(42).required(),
                        lastName: Joi.string().max(42).required(),
                        // language: Joi.string()
                        //     .valid('fr-FR', 'en-US')
                        //     .default('en-US'),
                    })
                    .required();

                const { email, password, firstName, lastName } = await userSchema.validateAsync(
                    req.body,
                );

                const { user: userRecord } = await new AuthenticationService().signUp(
                    email,
                    password,
                    firstName,
                    lastName,
                );
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
            const { user: userRecord } = await new AuthenticationService().signIn(email, password);
            await done(null, userRecord);
        } catch (err) {
            done(err);
        }
    }),
);
