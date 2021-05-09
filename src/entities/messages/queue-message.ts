export abstract class QueueMessage {
  static identifier: string;
  data: unknown;

  protected constructor(data: unknown) {
    this.data = data;
  }
}
