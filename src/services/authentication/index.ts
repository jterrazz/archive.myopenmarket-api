import * as argon2 from 'argon2';
import * as jwt from 'jsonwebtoken';
import { getConnection } from 'typeorm';

import { User, UserLanguage } from '~/entities/user.entity';
import { apiConfig } from '@config';
import { HttpError } from '@services/error';
import { createUser } from '~/entities/user.repository';

interface AuthenticationResult {
    user: User;
}

class AuthenticationService {
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
        const passwordHashed = await argon2.hash(password);
        const user = await createUser({
            email,
            passwordHashed,
            firstName,
            lastName,
            language,
        });

        return { user };
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

        return { user: userRecord };
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
