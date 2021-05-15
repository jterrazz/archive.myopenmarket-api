import * as registrationEmailConsumer from '~/worker/jobs/emails/registration-email.consumer';
import { authenticatorFactory } from '~/tests/server/fixtures/authentication';
import { startInMemoryApp, stopInMemoryApp } from '~/tests/setup/in-memory-app';
import { startWorker } from '~/worker/start-worker';

let authenticator;

const registrationEmailMessageConsumer = jest.spyOn(
  registrationEmailConsumer,
  'registrationEmailMessageConsumer',
);

/**
 * Tests
 */

beforeAll(async () => {
  await startWorker();
  const app = await startInMemoryApp();
  authenticator = authenticatorFactory(app);

  jest.clearAllMocks();
});

describe('POST /auth/signup', () => {
  test('it register a user', async () => {
    const userSession = await authenticator.createUser({
      firstName: 'John',
      lastName: 'Smith',
    });

    // TODO Tests values
  });

  test('it sends the registration email', async () => {
    await authenticator.createUser({
      email: 'registration-email-test@gmail.com',
    });

    expect(registrationEmailMessageConsumer).toHaveBeenCalledWith({
      data: {
        email: 'registration-email-test@gmail.com',
        templateValues: { user: { name: 'firstName' } },
      },
    });
  });
});

afterAll(async () => {
  await stopInMemoryApp();
});
