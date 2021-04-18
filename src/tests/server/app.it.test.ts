import { startInMemoryApp } from '~/tests/setup/in-memory-app';
import request from 'supertest';

let app;

beforeAll(async () => {
  app = await startInMemoryApp();
});

describe('application IT', () => {
  test('it initiates application', async () => {
    expect(app).toBeDefined();
  });

  test('it returns 200 on an existing url', async () => {
    const { status } = await request(app.callback()).get('/');
    expect(status).toBe(200);
  });

  test('it returns 404 on a missing url', async () => {
    const { status } = await request(app.callback()).get('/bad-url');
    expect(status).toBe(404);
  });

  test('it sends the custom headers with the request', async () => {
    const { header } = await request(app.callback()).get('/');
    expect(header['x-request-id']).toBeDefined();
  });
});
