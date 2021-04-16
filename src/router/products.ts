import Router from 'koa-router';
import { isAuthenticated } from '@middlewares/authentication';

const productRouter = new Router();

// productRouter
// .get('/search);
// .get('/:productId/orders', );
// .get('/:productId/comments', );
// .use(isAuthenticated).post('/:productId/comments', );
// .use(isAuthenticated).post('/:productId/ratings', );
// .use(isAuthenticated).post('/:productId/reports', );
// .get('/:productId', );
// .use(isAuthenticated).patch('/:productId', );
// .use(isAuthenticated).delete('/:productId', );
// .use(isAuthenticated).post('/', );

export default productRouter;
