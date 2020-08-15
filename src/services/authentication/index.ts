import * as argon2 from 'argon2';
import * as jwt from 'jsonwebtoken';

import { User, UserInterface, UserLanguage } from '@model';
import { apiConfig } from '@config';
import { HttpError } from '@tom';

interface AuthenticationResult {
    user: UserInterface;
    token?: string;
}

class AuthenticationService {
    /**
     * @todo Maybe delete this as we could use sessions
     * @param userRecord
     */
    private static generateJWT(userRecord: UserInterface) {
        const data = {
            userId: userRecord._id,
        };
        const signature = apiConfig.auth['jwt-signature'];
        const expiresIn = '24h';

        return jwt.sign({ data }, signature, { expiresIn });
    }

    /**
     * Creates a new user and returns the related jwt
     */
    async signUp(
        email: string,
        password: string,
        firstName: string,
        lastName: string,
        language: UserLanguage = UserLanguage.en,
    ): Promise<AuthenticationResult> {
        try {
            const passwordHashed = await argon2.hash(password);

            const user = new User({
                email,
                passwordHashed,
                firstName,
                lastName,
                language,
            });
            await user.save();

            return {
                user: user,
                token: null, // AuthenticationService.generateJWT(user),
            };
        } catch (err) {
            if (err.code == 11000 && err.keyPattern?.hasOwnProperty('email')) {
                throw new HttpError(422, 'This email is already used');
            }
            throw err;
        }
    }

    /**
     * Authenticate a pair of credentials and returns the JWT / User data
     */
    async signIn(email: string, password: string): Promise<AuthenticationResult> {
        const userRecord = await User.findOne({ email: email });
        if (!userRecord) {
            throw new HttpError(401, 'Authentication failed');
        }

        const correctPassword = await argon2.verify(userRecord.passwordHashed, password);
        if (!correctPassword) {
            throw new HttpError(401, 'Authentication failed');
        }

        return {
            user: userRecord,
            token: null, // AuthenticationService.generateJWT(user),
        };
    }

    /**
     * Delete a user
     */
    async deleteUser(id: string, password: string): Promise<boolean> {
        const userRecord = await User.findOne({ id });
        if (!userRecord) {
            throw new Error('User not found');
        }

        const correctPassword = await argon2.verify(userRecord.passwordHashed, password);
        if (!correctPassword) {
            throw new Error('Incorrect password');
        }

        await userRecord.deleteOne();
        return true;
    }
}

export default AuthenticationService;
