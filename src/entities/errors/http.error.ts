export class HttpError extends Error {
  status: number;
  expose = true;

  constructor(status = 500, message) {
    super(message);
    this.status = status;
  }
}
