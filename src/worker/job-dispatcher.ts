import { QueueMessage } from '@entities/messages/queue-message';
import Queue from 'bull';

export const dispatchJobsToQueue = async (
  queue: Queue.Queue,
  jobHandlers: [[typeof QueueMessage, (message: QueueMessage) => Promise<void>]],
): Promise<void> => {
  for (const [Message, consumer] of jobHandlers) {
    await queue.process(Message.identifier, async (job) =>
      consumer(new (Message as any)(job.data)),
    );
  }
};
