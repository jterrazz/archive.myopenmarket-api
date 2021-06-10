import { RawJson } from '~/types/koa';
import { RegistrationEmailMessage } from '~/models/messages/emails/registration-email.message';
import { User, createUserRequestSchema } from '~/models/user.entity';
import { createEmailJob } from '@services/jobs';
import { createUser } from '@repositories/user.repository';

export const signUpWithPassword = async (rawUser: RawJson): Promise<User> => {
  const user = await createUserRequestSchema.parse(rawUser);
  await createEmailJob(
    new RegistrationEmailMessage({
      email: user.email,
      templateValues: { user: { name: user.firstName } },
    }),
  );

  return await createUser(user);
};
