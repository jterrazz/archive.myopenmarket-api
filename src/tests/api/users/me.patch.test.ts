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

describe('PATCH /me', () => {
  test('it fails if the user is not authenticated', async () => {
    await userClient
      .patchMe(null, {
        lastName: 'Last',
      })
      .expect(401);
  });

  test('it updates the user profile', async () => {
    const userSession = await authenticator.createUser();

    await userClient
      .patchMe(userSession, {
        email: 'updateuseremail@gmail.com',
        firstName: 'First',
        lastName: 'Last',
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            email: 'updateuseremail@gmail.com',
            firstName: 'First',
            lastName: 'Last',
          }),
        );
      });

    await userClient
      .getUserById(userSession.body.user.id)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            firstName: 'First',
            lastName: 'Last',
          }),
        );
      });
  });

  test('it updates the user password', async () => {
    const userSession = await authenticator.createUser({
      email: 'users00004@gmail.com',
      password: 'TheOldPassword123',
    });

    await userClient
      .patchMe(userSession, {
        password: 'ThePassword123',
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.password).not.toBeDefined();
        expect(response.body.passwordHashed).not.toBeDefined();
      });

    await authenticator
      .login({
        email: 'users00004@gmail.com',
        password: 'ThePassword123',
      })
      .expect(200);
    await authenticator
      .login({
        email: 'users00004@gmail.com',
        password: 'TheOldPassword123',
      })
      .expect(401);
  });

  describe('it fails when one field is baldy formatted', () => {
    test('email', async () => {
      const userSession = await authenticator.createUser();
      await userClient.patchMe(userSession, { email: 'ok' }).expect(422);
    });

    test('password', async () => {
      const userSession = await authenticator.createUser();
      await userClient.patchMe(userSession, { password: '1234567' }).expect(422);
    });

    test('firstname', async () => {
      const userSession = await authenticator.createUser();
      await userClient.patchMe(userSession, { firstName: '1234567890'.repeat(5) }).expect(422);
    });
  });
});

afterAll(async () => {
  await stopInMemoryApp();
});
