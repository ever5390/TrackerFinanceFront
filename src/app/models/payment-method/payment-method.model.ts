import { AccountModel } from "../account/account.model";

export class PaymentMethodModel {
    constructor(
        public id: number = 0,
        public name: string = '',
        public account: AccountModel = new AccountModel(),
    ){}
}