import { AccountModel } from "../account/account.model";

export class PaymentMethodModel {
    constructor(
        public id: number = 0,
        public name: string = '',
        public icon: string = '',
        public color: string = '',
        public account: AccountModel | null = new AccountModel(),
        public workspaceId: number = 0,
        public used: boolean = false,
        public isChecked: boolean = false
    ){}
}