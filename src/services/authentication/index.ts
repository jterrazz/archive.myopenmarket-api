import * as argon2 from 'argon2';
import * as jwt from 'jsonwebtoken';
import { getConnection } from 'typeorm';

import { User, UserLanguage } from '~/entities/user.entity';
import { apiConfig } from '@config';
import { HttpError } from '@services/error';

interface AuthenticationResult {
    user: User;
    token?: string;
}

class AuthenticationService {
    /**
     * @todo Maybe delete this as we could use sessions
     * @param userRecord
     */
    private static generateJWT(userRecord: User) {
        const data = {
            userId: userRecord.id,
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
            const userRepository = await getConnection().getRepository(User);
            const user = userRepository.create({
                email,
                passwordHashed,
                firstName,
                lastName,
                language,
            });

            await userRepository.save(user);

            return {
                user: user,
                token: null, // AuthenticationService.generateJWT(user), // TODO Remove
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
        const userRepository = await getConnection().getRepository(User);
        const userRecord = await userRepository.findOne({ email });

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
    async deleteUser(id: string, password: string) {
        const userRepository = await getConnection().getRepository(User);
        const userRecord = await userRepository.findOne({ id });
        if (!userRecord) {
            throw new HttpError(404, 'User not found');
        }

        const isCorrectPassword = await argon2.verify(userRecord.passwordHashed, password);
        if (!isCorrectPassword) {
            throw new HttpError(402, 'Incorrect password');
        }

        await userRepository.delete(userRecord);
    }
}

export default AuthenticationService;
