import { Action } from "src/app/emuns/Action.enum";
import { Type } from "src/app/emuns/Type.enum";

export class MovementDto {
    constructor(
        public description: string = '',
        public headerTitle : string = '',
        public status: string = '',
        public amount : string = '',
        public type : Type = Type.EXPENSE,
        public action : Action = Action.NOT_APPLICABLE,
        public category : string = '',
        public segment : string = '',
        public paymentMethod : string = '',
        public createAt : Date = new Date(),
        public idTransactionAssoc : number = 0
     ){}
}