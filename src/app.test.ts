import request from 'supertest';
import { startTestApp, stopTestApp } from '~/__tests__/scripts/setup-app';

let app;

beforeAll(async () => {
    app = await startTestApp();
});

describe('APPLICATION INITIATION', () => {
    it('must be initiated', async () => {
        expect(app).toBeDefined();
    });

    it('GET /bad-url must return 404', async () => {
        const { status } = await request(app.callback()).get('/bad-url');
        expect(status).toBe(404);
    });

    it('GET / must return 200', async () => {
        const { status } = await request(app.callback()).get('/');
        expect(status).toBe(200);
    });
});

afterAll(async () => {
    await stopTestApp();
});
