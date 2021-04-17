import { QueueMessageHandler } from '@entities/messages/queue-message';
import logger from '@services/logger';

export class QueueDispatcher {
  private messageHandlers: typeof QueueMessageHandler[];

  constructor(messageHandlers: typeof QueueMessageHandler[]) {
    this.messageHandlers = messageHandlers;
  }

  fromJobData(data: any): QueueMessageHandler | null {
    logger.info(`new job dispatched <identifier:${data.identifier}> <version:${data.version}`);

    const Message: any = this.messageHandlers.find((MessageHandler: any) => {
      const instance = new MessageHandler(data);
      return instance.identifier === data.identifier && instance.version === data.version;
    });

    if (!Message) {
      logger.error(`queue dispatcher couldn\'t match the message ${JSON.stringify(data)}`);
      return null;
    }

    return new Message(data).consumer();
  }
}
