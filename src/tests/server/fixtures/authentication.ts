import { v4 } from 'uuid';
import Koa from 'koa';
import request from 'supertest';

const getRandomEmail = () => v4() + '@gmail.com';
const DEFAULT_PASSWORD = 'password-123-*&^';

export const authenticatorFactory = (app: Koa): unknown => ({
  createUser: (user = {}) => {
    return request(app.callback())
      .post('/auth/signup')
      .send({
        ...{
          email: getRandomEmail(),
          firstName: 'firstName',
          lastName: 'lastName',
          password: DEFAULT_PASSWORD,
        },
        ...user,
      });
  },
  login: (user = {}) => {
    return request(app.callback())
      .post('/auth/signin')
      .send({
        ...{
          email: getRandomEmail(),
          password: DEFAULT_PASSWORD,
        },
        ...user,
      });
  },
});
