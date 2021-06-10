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

describe('GET /me/followed-shops', () => {
  test('it returns an empty followed shop list', async () => {
    const userSession = await authenticator.createUser();
    await userClient
      .getMyFollowedShops(userSession)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual([]);
      });
  });

  // test('it returns the followed shop list', async () => {
  //   const userSession = await authenticator.createUser();
  //   await userClient.postMyFollowedShops(userSession, 1).expect(200);
  //   await userClient
  //     .getMyFollowedShops(userSession)
  //     .expect(200)
  //     .then((response) => {
  //       expect(response.body).toEqual(['fff']);
  //     });
  // });
});

afterAll(async () => {
  await stopInMemoryApp();
});
