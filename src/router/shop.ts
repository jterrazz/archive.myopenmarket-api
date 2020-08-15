import Router from 'koa-router';

const shopRouter = new Router();

shopRouter.get('/:shopAlias');

export default shopRouter;
