import { Type } from "src/app/emuns/Type.enum";

export class MovementDto {
    constructor(
        public description: string = '',
        public headerTitle : string = '',
        public status: string = '',
        public amount : string = '',
        public type : Type = Type.EXPENSE,
        public createAt : Date = new Date(),
        public idTransactionAssoc : number = 0
     ){}
}