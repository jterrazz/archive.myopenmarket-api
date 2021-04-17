import logger from '@services/logger';
import { QueueMessage } from '@entities/messages/queue-message';

export class MessageDispatcher {
  private messageHandlers: [typeof QueueMessage, (message: QueueMessage) => Promise<void>][];

  constructor(messageHandlers: [typeof QueueMessage, (message: QueueMessage) => Promise<void>][]) {
    this.messageHandlers = messageHandlers;
  }

  fromJobData(data: any): Promise<void> | undefined {
    try {
      const messageHandler = this.messageHandlers.find(([Message]) => {
        const instance = new (Message as any)(data);
        return instance.identifier === data.identifier && instance.version === data.version;
      });

      if (!messageHandler) {
        logger.error(`queue dispatcher couldn\'t match the message ${JSON.stringify(data)}`);
        return;
      }

      logger.info(`dispatching job <identifier:${data.identifier}> <version:${data.version}>`);

      return messageHandler[1](data);
    } catch (e) {
      logger.error(e);
    }
  }
}
