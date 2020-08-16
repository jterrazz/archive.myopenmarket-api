import request from 'supertest';
import { startTestApp, stopTestApp } from '~/tests/scripts/setup-app';

let app;

beforeAll(async () => {
    app = await startTestApp();
});

test('Initiate app', async () => {
    expect(app).toBeDefined();
});

test('GET /bad-url returns 404', async () => {
    const { status } = await request(app.callback()).get('/bad-url');
    expect(status).toBe(404);
});

test('GET / returns 200', async () => {
    const { status } = await request(app.callback()).get('/');
    expect(status).toBe(200);
});

afterAll(async () => {
    await stopTestApp();
});
