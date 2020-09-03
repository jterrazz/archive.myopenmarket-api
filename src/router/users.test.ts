import request from 'supertest';
import { startTestApp, stopTestApp } from '~/__tests__/scripts/setup-app';

let app;
let testUserId: string;
let testUserCookies;

export const postAuthSignup = (
    user = {
        email: 'email@gmail.com',
        password: 'password-123',
        firstName: 'firstName',
        lastName: 'lastName',
    },
) => {
    return request(app.callback()).post('/auth/signup').send(user);
};

export const getUserId = (userId) => request(app.callback()).get(`/users/${userId}`);
export const patchMe = (
    cookies = [],
    user = {
        email: 'email2@gmail.com',
        password: 'new-password-123',
        firstName: 'newFirstName',
        lastName: 'newLastName',
    },
) => request(app.callback()).patch(`/me`).send(user).set('Cookie', cookies);

/**
 * Tests
 */

beforeAll(async () => {
    app = await startTestApp();
    const { body, header } = await postAuthSignup();
    testUserId = body.user._id;
    testUserCookies = header['set-cookie'];
});

describe('STATE ROUTES', () => {
    it('GET /users/:userId must return public user data', async () => {
        await getUserId(testUserId)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body._id).toBeDefined();
                expect(response.body.firstName).toBeDefined();
                expect(response.body.lastName).toBeDefined();
                expect(response.body.language).toBeDefined();
            });
    });

    it('PATCH /me must update user information and return it', async () => {
        await patchMe(testUserCookies)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body._id).toBeDefined();
                expect(response.body.email).toBe('email2@gmail.com');
                expect(response.body.firstName).toBe('newFirstName');
                expect(response.body.lastName).toBe('newLastName');
            });
    });

    // TODO Check old password doesn't work
});

afterAll(async () => {
    app = await stopTestApp();
});
