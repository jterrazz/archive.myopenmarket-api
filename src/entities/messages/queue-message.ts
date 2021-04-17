export abstract class QueueMessage {
  identifier: string;
  version: number;
  data: unknown;

  constructor(data: unknown) {
    this.data = data;
  }
}

export abstract class QueueMessageHandler extends QueueMessage {
  consumer: () => Promise<unknown>;
}
