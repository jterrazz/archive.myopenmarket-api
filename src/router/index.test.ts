import request from 'supertest';
import { startTestApp, stopTestApp } from '~/__tests__/scripts/setup-app';

let app;

beforeAll(async () => {
    app = await startTestApp();
});

describe('STATE ROUTES', () => {
    it('GET / must return correct data', async () => {
        await request(app.callback())
            .get('/')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body.state).toBeDefined();
            });
    });
});

afterAll(async () => {
    app = await stopTestApp();
});
