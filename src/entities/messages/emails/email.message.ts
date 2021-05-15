import { QueueMessage } from '../queue.message';

type EmailMessageConstructor = {
  email: string;
  templateValues: any;
};

export abstract class EmailMessage extends QueueMessage {
  constructor({ email, templateValues }: EmailMessageConstructor) {
    super({
      email,
      templateValues,
    });
  }
}
