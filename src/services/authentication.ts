import * as argon2 from 'argon2';
import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';

import { User } from '@model';
import { apiConfig } from '../config';

class AuthService {
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
    async signUp(email: string, username: string, password: string, firstName: string, lastName: string) {
        const passwordHashed = await argon2.hash(password);

        const userRepo = await getRepository(User);
        const user = userRepo.create({
            email,
            passwordHashed,
            firstName,
            lastName,
            username,
        });
        const userRecord = await userRepo.save(user);

        return {
            user: userRecord.privateData,
            token: AuthService.generateJWT(userRecord),
        };
    }

    /**
     * Authenticate a pair of credentials and returns the JWT / User data
     */
    async signIn(email: string, password: string): Promise<any> {
        const userRecord = await getRepository(User).findOne({ email });
        if (!userRecord) {
            throw new Error('User not found');
        }

        const correctPassword = await argon2.verify(userRecord.passwordHashed, password);
        if (!correctPassword) {
            throw new Error('Incorrect password');
        }

        return {
            user: userRecord.privateData,
            token: AuthService.generateJWT(userRecord),
        };
    }

    /**
     * Delete a user
     */
    async deleteUser(id: number, password: string): Promise<any> {
        const userRecord = await getRepository(User).findOne({ id });
        if (!userRecord) {
            throw new Error('User not found');
        }

        const correctPassword = await argon2.verify(userRecord.passwordHashed, password);
        if (!correctPassword) {
            throw new Error('Incorrect password');
        }

        await getRepository(User).delete(userRecord);

        return true;
    }
}

export default AuthService;
