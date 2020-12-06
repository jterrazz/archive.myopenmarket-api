import { getConnection } from 'typeorm';
import { User } from '~/entities/user.entity';

export class UserRepository {
    static async updateUser(id: string, data: object): Promise<User> {
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
    }
}
