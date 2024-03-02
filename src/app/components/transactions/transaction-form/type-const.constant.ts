import { Action } from "src/app/emuns/Action.enum";
import { Type } from "src/app/emuns/Type.enum";

export const optionItemsConst: any[] = [
    {name:"Gasto", original:Type.EXPENSE, action:Action.REALICÉ, color:"red"},
    {name:"Ingreso", original:Type.INCOME, action:Action.RECIBÍ, color:"blue"},
    {name:"Transferencia", original:Type.TRANSFERENCE, action:Action.NOT_APPLICABLE, color:"green"},
    {name:"Préstamo realizado", original:Type.LOAN, action:Action.REALICÉ, color:"brown"},
    {name:"Préstamo recibido", original:Type.LOAN, action:Action.RECIBÍ, color:"skyblue"},
    {name:"Pago realizado", original:Type.PAYMENT, action:Action.REALICÉ, color:"purple"},
    {name:"Pago recibido", original:Type.PAYMENT, action:Action.RECIBÍ, color:"#67A69D"},
  ]