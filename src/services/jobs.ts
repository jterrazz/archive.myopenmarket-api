import { EmailMessage } from '~/models/messages/emails/email.message';
import { OrderMessage } from '~/models/messages/orders/order.message';
import { emailQueue, orderQueue } from '@services/queue';

export const createOrderJob = (message: OrderMessage): Promise<void> =>
  // @ts-ignore
  orderQueue.add(message.constructor.identifier, message.data);

export const createEmailJob = (message: EmailMessage): Promise<void> =>
  // @ts-ignore
  emailQueue.add(message.constructor.identifier, message.data);
