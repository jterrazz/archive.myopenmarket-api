import { startInMemoryApp } from '~/tests/setup/in-memory-app';
import { authenticatorFactory } from './fixtures/authentication';
import { userClientFactory } from './fixtures/user';

let authenticator;
let userClient;

/**
 * Tests
 */

beforeAll(async () => {
  const app = await startInMemoryApp();
  authenticator = authenticatorFactory(app);
  userClient = userClientFactory(app);
});

describe('users IT', () => {
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
            id: 1,
            firstName: 'Jean-Baptiste',
            lastName: 'Terrazzoni',
            language: null,
          });
        });
    });

    test('it returns 404 on a missing user', async () => {
      await userClient.getUserById('yes').expect(404);
    });
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

  describe('PATCH /me', () => {
    test('it fails if the user is not authenticated', async () => {
      await userClient
        .patchUser(null, {
          lastName: 'Last',
        })
        .expect(401);
    });

    test('it updates the user profile', async () => {
      const userSession = await authenticator.createUser();

      await userClient
        .patchUser(userSession, {
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
        .patchUser(userSession, {
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
        await userClient.patchUser(userSession, { email: 'ok' }).expect(422);
      });

      test('password', async () => {
        const userSession = await authenticator.createUser();
        await userClient.patchUser(userSession, { password: '1234567' }).expect(422);
      });

      test('firstname', async () => {
        const userSession = await authenticator.createUser();
        await userClient.patchUser(userSession, { firstName: '1234567890'.repeat(5) }).expect(422);
      });
    });
  });
});
