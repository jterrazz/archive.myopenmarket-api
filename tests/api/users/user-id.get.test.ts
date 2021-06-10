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

describe('GET /:userId', () => {
  test('it returns the public user data', async () => {
    const userSession = await authenticator.createUser({
      firstName: 'Jean-Baptiste',
      lastName: 'Terrazzoni',
    });

    await userClient
      .getUserById(userSession.body.user.id)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual({
          firstName: 'Jean-Baptiste',
          id: 3,
          language: null,
          lastName: 'Terrazzoni',
        });
      });
  });

  test('it returns 404 on a missing user', async () => {
    await userClient.getUserById('yes').expect(404);
  });
});

afterAll(async () => {
  await stopInMemoryApp();
});
