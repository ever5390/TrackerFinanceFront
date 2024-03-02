import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaymentMethodModel } from 'src/app/models/payment-method/payment-method.model';
import { TransactionModel } from 'src/app/models/transaction/transaction.model';
import { TransactionService } from 'src/app/services/transaction/transaction.service';
import { optionItemsConst } from './type-const.constant';
import { Utils } from 'src/app/utils/utils.component';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css']
})
export class TransactionFormComponent {
  @Input("IdTransactionReceived") IdTransactionReceived: number = 0;
  @Output() sendOrderCloseFormularyPopUp = new EventEmitter<any>();
  @Output() sendReloadTransactionsOrderFromFormularyTx = new EventEmitter<any>();
  
  itemsPopUps: any[] = [
    {name:"subcategory", "show":false},
    {name:"account", "show":false},
    {name:"accountDestiny", "show":false},
    {name:"operation", "show":false},
    {name:"tags", "show":false},
    {name:"counterpart", "show":false},
    {name:"paymentMethod", "show":false},
    {name:"recurrency", "show":false},
    {name:"transactionLoan", "show":false},
    {name:"calendar","show":false}
  ]

  itemSelected: any;

  transaction: TransactionModel = new TransactionModel();
  operationTypeReceived: any;
  workspaceId: number = 0;

  optionConst : any[] = optionItemsConst; 

  constructor(private _transactionService: TransactionService) {
    this.workspaceId = parseInt(localStorage.getItem("workspaceId") || '0');

    if(this.IdTransactionReceived != 0) {
      this.getByIdAndUserId();
    }
  }

  receiveTypeOperationItemSelected(itemSelectedType: any) {
    this.operationTypeReceived = itemSelectedType;
    this.transaction.type = itemSelectedType.original;
    this.transaction.action = itemSelectedType.action;
    this.closeAllPopUpsByItem();
  }

  // ::::: BEGIN :::: metodos para abrir y cerrar los popUps

  closeFormularyPopUp() {
    this.sendOrderCloseFormularyPopUp.emit(0);
  }

  closeAllPopUpsByItem() {
    this.itemsPopUps.forEach( i => {
      i.show = false;
    });
  }

  showPopUpByItem(item: string) {
    this.itemSelected = item;
    this.itemsPopUps.forEach( i => {
      i.show = false;
      if(i.name == item)
        i.show = true;
    });
  }

  shouldShowComponent(componentName: string): boolean {
    const item = this.itemsPopUps.find(item => item.name === componentName);
    return item ? item.show : false;
  }

  // ::::: END :::: metodos para abrir y cerrar los popUps

  getByIdAndUserId() {
    this._transactionService.getByIdAndUserId(this.IdTransactionReceived, this.workspaceId).subscribe({
      next: (response) => {
        this.transaction = response;
        this.operationTypeReceived = this.optionConst.filter(item => item.original == this.transaction.type);
      },
      error: (error: any) => {
        alert(error.error.message);
      }
    });
  }

  create() {
    console.log(this.transaction);
    this._transactionService.createByUserId(this.transaction, this.workspaceId).subscribe({
      next: (response) => {
        alert("Operación creada correctamente");
        this.sendReloadTransactionsOrderFromFormularyTx.emit();
      },
      error: (error: any) => {
        alert(error.error.message);
      }
    });
  }

  update() {
    this._transactionService.updateByIdAndUserId(this.transaction.id, this.transaction, this.workspaceId).subscribe({
      next: (response) => {
        alert("Operación actualizada correctamente");
        this.sendReloadTransactionsOrderFromFormularyTx.emit();
      },
      error: (error: any) => {
        alert(error.error.message);
      }
    });
  }



    // ::::: BEGIN :::: Seteando parametros de transacción

  accountIdSendToPaymentMethodPopUp: number = 0;
  receivedItemSelected(event: any) {
    switch (event.type) {
      case "countepart":
        this.transaction.counterpart = event.object;
        break;
      case "subcategory":
        this.transaction.subCategory = event.object;
        break; 
      case "account":
        if(this.transaction.account && this.transaction.account.id != event.object.id) {
          this.transaction.paymentMethod = new PaymentMethodModel();
        }
        this.transaction.account = event.object;
        this.accountIdSendToPaymentMethodPopUp = this.transaction.account.paymentMethods.length>0?this.transaction.account.id:0;
        break;
      case "accountDestiny":
        this.transaction.accountDestiny = event.object;
        break;
      case "tags":
        this.transaction.tags = event.object;
        break;
      case "accountDestiny":
        this.transaction.accountDestiny = event.object;
        break; 
      case "paymentMethod":
        this.transaction.paymentMethod = event.object;
        break; 
      case "transactionLoan":
        console.log("LOAN REC");
        this.transaction.setTransactionLoanAssocToPay(new TransactionModel());
        this.transaction.transactionLoanAssocToPay = event.object;
        console.log(this.transaction.transactionLoanAssocToPay?.id);
        break; 
      default:
        break;
    }

    this.closeAllPopUpsByItem();
  }

  dateToShow: Date = new Date();
  receivedDateSelectedFromCalendar(objectDateReceived: any) {
    this.dateToShow = objectDateReceived.dateSelected;
    this.transaction.createAt = Utils.formatDateWithHour(objectDateReceived.dateSelected);
    this.closeAllPopUpsByItem();
  }
}
