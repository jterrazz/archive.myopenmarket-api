import request from 'supertest';
import { startTestApp, stopTestApp } from '~/__tests__/scripts/setup-app';

let app;

beforeAll(async () => {
    app = await startTestApp();
});

describe('Koa application', () => {
    it('is initiated', async () => {
        expect(app).toBeDefined();
    });

    it('returns 200 on an existing route', async () => {
        const { status } = await request(app.callback()).get('/');
        expect(status).toBe(200);
    });

    it('returns 200 on the graphql endpoint', async () => {
        const { status } = await request(app.callback()).post('/graphql');
        expect(status).toBe(200);
    });

    it('returns 404 on a missing route', async () => {
        const { status } = await request(app.callback()).get('/bad-url');
        expect(status).toBe(404);
    });
});

afterAll(async () => {
    await stopTestApp();
});
