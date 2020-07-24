import request from 'supertest';
import setupApp from './app';

let app;
let connection;

test('Initiate app (+ database)', async () => {
    const { app: koaApp, connection: appConnection } = await setupApp();
    app = koaApp;
    connection = appConnection;
    expect(app).toBeDefined();
    expect(connection).toBeDefined();
});

test('/bad-url returns 404', async () => {
    const { status } = await request(app.callback()).get('/bad-url');
    expect(status).toBe(404);
});

afterAll(async () => {
    await connection.close();
});
