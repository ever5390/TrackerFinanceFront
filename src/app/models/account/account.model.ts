import { PaymentMethodModel } from "../payment-method/payment-method.model";

export class AccountModel {
    constructor(
        public id: number = 0,
        public name: string = '',
        public icon: string = '',
        public color: string = '',
        public active: boolean = true,
        public paymentMethods: PaymentMethodModel[] = [],
        public currentBalanceText: string = "",
        public currentBalance: number = 0.0,
        public workspaceId: number = 0,
        public selected: boolean = false
    ){}
}