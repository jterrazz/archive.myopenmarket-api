import { startInMemoryApp, stopInMemoryApp } from '../../setup/in-memory-app';
import request from 'supertest';

let app;

beforeAll(async () => {
  app = await startInMemoryApp();
});

describe('status IT', () => {
  describe('GET /', () => {
    it('returns application status', async () => {
      await request(app.callback())
        .get('/')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => expect(response.body.state).toBeDefined());
    });
  });
});

afterAll(async () => {
  await stopInMemoryApp();
});
