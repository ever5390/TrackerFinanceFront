import { Type } from "src/app/emuns/Type.enum";
import { PaymentMethodModel } from "../payment-method/payment-method.model";
import { Action } from "src/app/emuns/Action.enum";
import { Block } from "src/app/emuns/Block.enum";
import { Status } from "src/app/emuns/Status.enum";
import { AccountModel } from "../account/account.model";
import { CounterPartModel } from "../counterPartModel/counterpart.model";
import { Tag } from "../tag/tag.model";
import { SubCategoryModel } from "../subCategory/subCategory.model";
import { Utils } from "src/app/utils/utils.component";
import { UserRegister } from "../user/register.model";

export class TransactionModel {

  transactionLoanAssocToPay: TransactionModel | undefined;

  constructor(
    public id: number = 0,
    public amount: number = 0,
    public description: string = '',
    public createAt: string = '',
    public type: Type = Type.DEFAULT,
    public account: AccountModel = new AccountModel(),
    public paymentMethod: PaymentMethodModel = new PaymentMethodModel(),
    public accountDestiny: AccountModel = new AccountModel(),
    public paymentMethodDestiny: PaymentMethodModel = new PaymentMethodModel(),
    public subCategory: SubCategoryModel = new SubCategoryModel(),
    public action: Action = Action.NOT_APPLICABLE,
    public status: Status = Status.NOT_APPLICABLE,
    public block: Block= Block.NOT_APPLICABLE,
    public remaining: number = 0,
    public tags: Tag[] = [],
    public counterpart: CounterPartModel = new CounterPartModel(),
    public responsableUser: UserRegister = new UserRegister(),
    public workspaceId: number = 0,

    public typeSpanish: string = ""
    // public recurring: Recurring = new Recurring(),
  ) {}

  setTransactionLoanAssocToPay(transactionLoanAssocToPay: TransactionModel) {
    this.transactionLoanAssocToPay = transactionLoanAssocToPay;
  }
}
