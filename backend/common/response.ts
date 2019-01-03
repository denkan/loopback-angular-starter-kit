

export class Response {

  static error(errorObj: Error | any, fallbackMessage?: string, fallbackStatusCode?: number) {
    if(errorObj) return errorObj;

    errorObj = new Error(fallbackMessage);
    errorObj.status = fallbackStatusCode;
    return errorObj;
  }

}
