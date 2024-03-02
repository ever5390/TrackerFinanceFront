import { TransactionModel } from "src/app/models/transaction/transaction.model";

export class ResumenMovementDto {
    constructor(
        public totalIN: number = 0,
        public totalOUT: number = 0,
        public totalTheyOweMe: number = 0,
        public totalIOweYou: number = 0,
        public movememts: TransactionModel[] = []
    ){}
}