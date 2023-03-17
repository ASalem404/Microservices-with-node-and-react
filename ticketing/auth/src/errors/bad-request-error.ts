import { CustomError } from "./custom-error";

export class BadRequesrError extends CustomError {
  statusCode = 400;
  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, BadRequesrError.prototype);
  }
  serializeErrors() {
    return [{ message: this.message }];
  }
}
