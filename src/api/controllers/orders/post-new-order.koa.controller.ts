import { Middleware } from 'koa';
import { OrderMessage } from '@entities/messages/orders/order.message';
import { StatusCodes } from 'http-status-codes';
import { createOrderJob } from '@services/jobs';

export const postNewOrderController: Middleware = async (ctx) => {
  ctx.tracker.requestPostOrder();

  const order = new OrderMessage([]);
  await createOrderJob(order);

  ctx.status = StatusCodes.OK;
};
