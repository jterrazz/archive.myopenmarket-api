export class QueueMessage {
  private _version: number;
  private _data: unknown;

  constructor(version: number, data: unknown) {
    this._version = version;
    this._data = data;
  }
}
