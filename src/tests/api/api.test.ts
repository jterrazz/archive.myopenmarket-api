import { startInMemoryApp, stopInMemoryApp } from '~/tests/setup/in-memory-app';
import request from 'supertest';

let app;

beforeAll(async () => {
  app = await startInMemoryApp();
});

describe('API application', () => {
  test('it initiates the application', async () => {
    expect(app).toBeDefined();
  });

  test('it returns 200 with an existing url', async () => {
    const { status } = await request(app.callback()).get('/');
    expect(status).toBe(200);
  });

  test('it returns 404 with a missing url', async () => {
    const { status } = await request(app.callback()).get('/bad-url');
    expect(status).toBe(404);
  });

  test('it sends custom headers with the request', async () => {
    const { header } = await request(app.callback()).get('/');
    expect(header['x-request-id']).toBeDefined();
  });
});

afterAll(async () => {
  await stopInMemoryApp();
});
