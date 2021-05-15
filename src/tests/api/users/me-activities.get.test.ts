import { authenticatorFactory } from '../fixtures/authentication';
import { startInMemoryApp, stopInMemoryApp } from '~/tests/setup/in-memory-app';
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

describe('GET /me/activities', () => {
  test('it returns activities ordered by date', async () => {
    // Given
    const otherUserSession1 = await authenticator.createUser();
    const userSession = await authenticator.createUser();
    const otherUserSession2 = await authenticator.createUser();
    await userClient
      .patchMe(otherUserSession1, { email: 'activityuserSession1@gmail.com' })
      .expect(200);
    await userClient.patchMe(userSession, { email: 'activity@gmail.com' }).expect(200);
    await userClient.patchMe(userSession, { email: 'activity2@gmail.com' }).expect(200);
    await userClient
      .patchMe(otherUserSession2, { email: 'activityuserSession2@gmail.com' })
      .expect(200);

    // When
    const ft = userClient.getMyActivities(userSession);

    // Expect
    await ft.expect(200).then((response) => {
      expect(response.body.length).toEqual(2);
      expect(response.body[0].ipAddress).toEqual('::ffff:127.0.0.1');
      expect(response.body[0].type).toEqual('update-profile');
      expect(response.body[1].ipAddress).toEqual('::ffff:127.0.0.1');
      expect(response.body[1].type).toEqual('update-profile');
    });
  });
});

afterAll(async () => {
  await stopInMemoryApp();
});
