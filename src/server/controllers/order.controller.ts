import { Middleware } from 'koa';
import { orderQueue } from '@services/queue';
import { OrderMessage } from '@entities/messages/order.message';
import { StatusCodes } from 'http-status-codes';

/**
 * Koa controllers
 */

export const postOrderController: Middleware = async (ctx) => {
  ctx.tracker.requestPostOrder();

  const order = new OrderMessage([]);
  orderQueue.add(OrderMessage.identifier, order);

  ctx.status = StatusCodes.OK;
};
