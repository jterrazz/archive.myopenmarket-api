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

describe('POST /me/followed-shops', () => {
  test('it fails when the shop doesnt exist', async () => {
    const userSession = await authenticator.createUser();
    await userClient.postMyFollowedShops(userSession, 1).expect(404);
  });
});

afterAll(async () => {
  await stopInMemoryApp();
});
