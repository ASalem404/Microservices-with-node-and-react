
/*
  !we want to enforce the error to have a specific shape which will be used in frontend:
/*
 * * ststusCode: Number
 * * squlizeErrors() {
 * *    message:String
 * *    feild:String
 * * }[]
 *
*/
// so instead of using interface we will use an Abstract class to take advantage of "instance of" method  

export abstract class CustomError extends Error {
  abstract statusCode: number
  constructor(msg: string) {
    super(msg)
    Object.setPrototypeOf(this, CustomError.prototype)
  }
  abstract serializeErrors(): {
    message: string;
    feild?: string
  }[]
}