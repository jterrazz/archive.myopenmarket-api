export class HttpError extends Error {
  status: number;
  expose = true;

  constructor(status = 500, message: string) {
    super(message);
    this.status = status;
  }
}
