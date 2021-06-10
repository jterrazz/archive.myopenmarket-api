import { authenticatorFactory } from '../fixtures/authentication';
import { startInMemoryApp, stopInMemoryApp } from '../../setup/in-memory-app';
import { startWorker } from '~/worker/start-worker';
import { userClientFactory } from '../fixtures/users';

let authenticator;
let userClient;

/**
 * Tests
 */

beforeAll(async () => {
  await startWorker();
  const app = await startInMemoryApp();
  authenticator = authenticatorFactory(app);
  userClient = userClientFactory(app);

  await authenticator.createUser();
  await authenticator.createUser();
});

describe('DELETE /me', () => {
  test('it deletes the user', async () => {
    const userSession = await authenticator.createUser({
      email: 'todelete@gmail.com',
      password: 'ThePassword123',
    });

    await userClient
      .deleteMe(userSession, {
        password: 'ThePassword123',
      })
      .expect(200);

    await authenticator
      .login({
        email: 'todelete@gmail.com',
        password: 'ThePassword123',
      })
      .expect(401);
  });

  test('it returns 404 on a missing user', async () => {
    await userClient.getUserById('yes').expect(404);
  });
});

afterAll(async () => {
  await stopInMemoryApp();
});
