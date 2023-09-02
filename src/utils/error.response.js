/**Global Error Class*/
export class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status =
      this.statusCode >= 400 && this.statusCode < 500 ? "failed" : "error";
    Error.captureStackTrace(this, this.constructor);
  }
}
