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

test('GET /bad-url returns 404', async () => {
    const { status } = await request(app.callback()).get('/bad-url');
    expect(status).toBe(404);
});

test('GET / returns 200', async () => {
    const { status } = await request(app.callback()).get('/');
    expect(status).toBe(200);
});

test('POST /graphql returns 500', async () => {
    const { status } = await request(app.callback()).post('/graphql');
    expect(status).toBe(500);
});

afterAll(async () => {
    if (connection) await connection.close();
});
