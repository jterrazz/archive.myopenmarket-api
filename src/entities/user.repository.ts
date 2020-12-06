import { getConnection } from 'typeorm';
import { User } from '~/entities/user.entity';
import { HttpError } from '@services/error';

export class UserRepository {
    static _assertUserErrors(e: any) {
        if (e.detail && e.detail.match(/email(.*)already exists/)) {
            throw new HttpError(422, 'This email is already used');
        }
    }

    static async updateUser(id: string, data: object): Promise<User> {
        try {
            const userRepository = await getConnection().getRepository(User);
            const userRecord = await userRepository.findOne({ id });

            Object.assign(userRecord, data);
            // const activity = new Activity({ ipAddress, type: 'user-update' });
            // //         await activity.save();
            // //         userRecord.activity.push(activity);
            // //         await userRecord.save();
            // //         return userRecord;
            await userRepository.save(userRecord);

            return userRecord;
        } catch (e) {
            UserRepository._assertUserErrors(e);
        }
    }

    static async createUser(data: object): Promise<User> {
        try {
            const userRepository = await getConnection().getRepository(User);
            const user = userRepository.create(data);

            await userRepository.save(user);

            return user;
        } catch (e) {
            UserRepository._assertUserErrors(e);
        }
    }
}
