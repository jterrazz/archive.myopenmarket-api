export abstract class QueueMessage {
  static identifier: string;
  data: any;

  protected constructor(data: unknown) {
    this.data = data;
  }
}
