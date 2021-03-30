import request from 'supertest';
import { startInMemoryApp, stopInMemoryApp } from '~/tests/setup/in-memory-app';

let app;

beforeAll(async () => {
  app = await startInMemoryApp();
});

describe('app.test.ts', () => {
  describe('application', () => {
    test('is initiated', async () => {
      expect(app).toBeDefined();
    });

    test('returns 200 on an existing url', async () => {
      const { status } = await request(app.callback()).get('/');
      expect(status).toBe(200);
    });

    test('returns 404 on a nonexistent url', async () => {
      const { status } = await request(app.callback()).get('/bad-url');
      expect(status).toBe(404);
    });
  });
});

afterAll(async () => {
  await stopInMemoryApp();
});
