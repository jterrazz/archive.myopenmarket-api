import request from 'supertest';
import app from './app';

test('Route / returns 404', async () => {
    const { status, text } = await request(app.callback()).get('/');
    expect(status).toBe(404);
    // expect(text).toBe('Hello World');
});
