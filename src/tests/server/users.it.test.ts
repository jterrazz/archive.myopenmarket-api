import { authenticatorFactory } from './fixtures/authentication';
import { startInMemoryApp } from '~/tests/setup/in-memory-app';
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

  await authenticator.createUser();
  await authenticator.createUser();
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

  describe('POST /me/followed-shops', () => {
    test('it fails when the shop doesnt exist', async () => {
      const userSession = await authenticator.createUser();
      await userClient.postMyFollowedShops(userSession, 1).expect(404);
    });
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
});
