export class HttpErrorResponseCustom {
    constructor(
       public timestamp: Date = new Date(),
       public httpStatusCode: number = 0,
       public httpStatus: string = '',
       public reason: string = '',
       public message: string = ''
    ){}
}