import { Middleware } from 'koa';
import { OrderMessage } from '@entities/messages/order.message';
import { StatusCodes } from 'http-status-codes';
import { orderQueue } from '@services/queue';

/**
 * Koa controllers
 */

export const postOrderController: Middleware = async (ctx) => {
  ctx.tracker.requestPostOrder();

  const order = new OrderMessage([]);
  orderQueue.add(OrderMessage.identifier, order);

  ctx.status = StatusCodes.OK;
};
