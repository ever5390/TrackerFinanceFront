import { Type } from "src/app/emuns/Type.enum";
import { CategoryModel } from "../category/category.model";
import { MemberModel } from "../member/member.model";
import { PaymentMethodModel } from "../payment-method/payment-method.model";
import { SegmentModel } from "../segment/segment.model";
import { Action } from "src/app/emuns/Action.enum";
import { Block } from "src/app/emuns/Block.enum";
import { Status } from "src/app/emuns/Status.enum";

export class TransactionModel {
  constructor(
    public id: number = 0,
    public amount: number = 0,
    public description: string = '',
    public createAt: string = '',
    public type: Type = Type.DEFAULT,
    public paymentMethod: PaymentMethodModel = new PaymentMethodModel(),
    public paymentMethodDestiny: PaymentMethodModel  = new PaymentMethodModel(),
    public category: CategoryModel = new CategoryModel(),
    public segment: SegmentModel = new SegmentModel(),
    public action: Action = Action.NOT_APPLICABLE,
    public status: Status = Status.NOT_APPLICABLE,
    public block: Block = Block.NOT_APPLICABLE,
    public remaining: number = 0,
    public member: MemberModel = new MemberModel(),
    public idLoanAssoc: number = 0,
    public userId: number = 0
  ) {}
}
