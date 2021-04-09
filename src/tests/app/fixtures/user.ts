import request from 'supertest';

export const userClientFactory = (app) => {
  return {
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
  };
};
