export class AccountModel {
    constructor(
        public id: number = 0,
        public name: string = '',
        public currentBalance: number = 0.0,
        public userId: number = 0
    ){}
}