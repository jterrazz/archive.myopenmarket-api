import request from 'supertest';
import { startInMemoryApp } from '~/tests/setup/in-memory-app';

let app;

beforeAll(async () => {
  app = await startInMemoryApp();
});

describe('Request GET /', () => {
  it('returns application status', async () => {
    await request(app.callback())
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.state).toBeDefined();
      });
  });
});
