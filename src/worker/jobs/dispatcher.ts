import { QueueMessage } from '~/models/messages/queue.message';
import Queue from 'bull';

export const dispatchJobsToConsumers = async (
  queue: Queue.Queue,
  jobHandlers: [[any, (message: QueueMessage) => Promise<void>]],
): Promise<void> => {
  for (const [Message, consumer] of jobHandlers) {
    await queue.process(Message.identifier, async (job) => {
      return consumer(new (Message as any)(job.data));
    });
  }
};
