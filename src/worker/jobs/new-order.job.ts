import { orderQueue } from '@services/queue';

orderQueue.process(async (job) => {
  console.log(job);
});
