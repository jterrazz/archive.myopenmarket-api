import Queue from 'bull';

import { storeConfig } from '@config';

const QueueIdentifier = {
  order: 'order',
};

export const orderQueue = new Queue(QueueIdentifier.order, storeConfig.url);
