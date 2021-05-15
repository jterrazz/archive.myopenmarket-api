import { dispatchJobsToConsumers } from '~/worker/jobs/dispatcher';
import logger from '@services/logger';

import { OrderMessage } from '@entities/messages/orders/order.message';
import { RegistrationEmailMessage } from '@entities/messages/emails/registration-email.message';
import { emailQueue, orderQueue } from '@services/queue';
import { orderMessageConsumer } from '~/worker/jobs/orders/order.consumer';
import { registrationEmailMessageConsumer } from '~/worker/jobs/emails/registration-email.consumer';

export const startConsumers = async (): Promise<void> => {
  logger.info('starting consumers');

  await dispatchJobsToConsumers(emailQueue, [
    [RegistrationEmailMessage, registrationEmailMessageConsumer],
  ]);
  await dispatchJobsToConsumers(orderQueue, [[OrderMessage, orderMessageConsumer]]);
};
