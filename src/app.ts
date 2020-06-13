import Koa from 'koa';

import { setStatusMessageMiddleware } from './middlewares/http-status';
import trackerMiddleware from './middlewares/tracker';
import router from './routes';

// App setup

const app = new Koa();

app.use(trackerMiddleware);
app.use(router.routes()).use(router.allowedMethods());
app.use(setStatusMessageMiddleware);

export default app;
