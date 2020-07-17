import * as argon2 from 'argon2';
import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';

import { User } from '@model';
import config from '@config';

class AuthService {
    private static generateJWT(user) {
        const data = {
            userId: user.id,
        };
        const signature = config.JWT_SIGNATURE;
        const expiresIn = '24h';

        return jwt.sign({ data }, signature, { expiresIn });
    }

    /**
     * Creates a new user and returns the related jwt
     */
    async signUp(email: string, password: string, firstName: string, lastName: string) {
        const passwordHashed = await argon2.hash(password);

        const userRepo = await getRepository(User);
        const user = userRepo.create({
            email,
            passwordHashed,
            firstName,
            lastName,
        });
        const userRecord = await userRepo.save(user);

        return {
            user: userRecord.publicData,
            token: AuthService.generateJWT(userRecord),
        };
    }

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
            user: userRecord.publicData,
            token: AuthService.generateJWT(userRecord),
        };
    }
}

export default AuthService;
