import { Action } from "src/app/emuns/Action.enum";
import { Type } from "src/app/emuns/Type.enum";

export const optionItemsConst: any[] = [
    {"name":"Gasto", "original":Type.EXPENSE, "action":Action.REALICÉ},
    {"name":"Ingreso", "original":Type.INCOME, "action":Action.RECIBÍ},
    {"name":"Transferencia", "original":Type.TRANSFERENCE, "action":Action.NOT_APPLICABLE},
    {"name":"Préstamo realizado", "original":Type.LOAN, "action":Action.REALICÉ},
    {"name":"Préstamo recibido", "original":Type.LOAN, "action":Action.RECIBÍ},
    {"name":"Pago realizado", "original":Type.PAYMENT, "action":Action.REALICÉ},
    {"name":"Pago recibido", "original":Type.PAYMENT, "action":Action.RECIBÍ}
  ]