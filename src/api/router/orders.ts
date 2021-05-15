import { postNewOrderController } from '~/api/controllers/orders/post-new-order.koa.controller';
import Router from 'koa-router';

export const ordersRouter = new Router();

ordersRouter.post('/', postNewOrderController); // which contract
// .get('/', );
// .get('/:orderId', );
// .patch('/:orderId', );
// .delete('/:orderId', );
