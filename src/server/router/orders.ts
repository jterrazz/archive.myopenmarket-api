import Router from 'koa-router';

import { postOrderController } from '@controllers/order.controller';

export const ordersRouter = new Router();

ordersRouter.post('/', postOrderController); // which contract
// .get('/', );
// .get('/:orderId', );
// .patch('/:orderId', );
// .delete('/:orderId', );
