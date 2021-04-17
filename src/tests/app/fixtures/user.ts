import request from 'supertest';
import Koa from 'koa';

export const userClientFactory = (app: Koa): unknown => ({
  getUserById: (userId) => request(app.callback()).get(`/users/${userId}`),
  patchMe: (userSession, user) =>
    request(app.callback())
      .patch(`/me`)
      .send(user)
      .set('Cookie', userSession?.header['set-cookie'] || []),
  deleteMe: (userSession, user) =>
    request(app.callback())
      .delete(`/me`)
      .send(user)
      .set('Cookie', userSession?.header['set-cookie'] || []),
  getMyActivities: (userSession) =>
    request(app.callback())
      .get(`/me/activities`)
      .set('Cookie', userSession?.header['set-cookie'] || []),
  getMyFollowedShops: (userSession) =>
    request(app.callback())
      .get(`/me/followed-shops`)
      .set('Cookie', userSession?.header['set-cookie'] || []),
  postMyFollowedShops: (userSession, followedShop) =>
    request(app.callback())
      .post(`/me/followed-shops?shopId=` + followedShop)
      .set('Cookie', userSession?.header['set-cookie'] || []),
});
