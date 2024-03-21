import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { TransactionModel } from 'src/app/models/transaction/transaction.model';
import { TransactionService } from 'src/app/services/transaction/transaction.service';
import { AuthenticationService } from 'src/app/services/user/authentication.service';
import { optionItemsConst } from '../transaction-form/type-const.constant';
import { AccountModel } from 'src/app/models/account/account.model';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.css']
})
export class TransactionsListComponent {
  @Input("receivedTransactions") receivedTransactions : TransactionModel[] = [];
  @Output() sendOrderShowFormularyPopUp = new EventEmitter<any>();
  @Output() sendConfirmDelete = new EventEmitter<any>();

  orderCloseormularyPopUp: boolean = false;

  _oauthService = inject(AuthenticationService);
  _transactionService = inject(TransactionService);

  transactions: TransactionModel[] = [];
  transaction: TransactionModel = new TransactionModel();

  workspaceId: number = 0;
  idTransactionToSendUpdate: number = 0;

  optionConst : any[] = optionItemsConst; 
  colorShowType: any;

  constructor(){
    this.workspaceId = parseInt(localStorage.getItem("workspaceId") || '0');
    console.log(this.receivedTransactions);
  }

  receiveOrderCloseFormularyPopUp() {
    this.idTransactionToSendUpdate = 0;
    this.orderCloseormularyPopUp = false;
  }

  showUpdateTransaction(idTransactionToSendUpdate: number) {
    this.sendOrderShowFormularyPopUp.emit({id:idTransactionToSendUpdate, order:(idTransactionToSendUpdate==0)?'new':'update'});
  }

  setTypeTransaction(typeRec : string, actionRec: string): any{
    let typeShow = this.optionConst.find(type => type.original == typeRec && type.action == actionRec);
    return typeShow;
  }

  setFormatTextTransference(account: AccountModel, accountDestiny: AccountModel) {
    let type = "Transferencia: ";
    let text = "Desde " + account.name + " hacia " + accountDestiny.name + ": ";
    if(account.name.toLocaleUpperCase() == "EFECTIVO") {
      type = "DEPÓSITO: "
    }
    if(accountDestiny.name.toLocaleUpperCase() == "EFECTIVO") {
      type = "RETIRO: "
    }

    return type + text;
  }

  TransactionDelete(idTransactionToDelete: number) {
    this._transactionService.deleteByIdAndUserId(idTransactionToDelete, this.workspaceId).subscribe({
      next: () => {
        alert("Operación eliminada correctamente");
        this.sendConfirmDelete.emit();
      },
      error: (error: any) => {
        console.log(error);
        alert(error.error.message);
        this.sendConfirmDelete.emit();
      }
    });
  }

  showTransactionAssoc(transactionLoanAssocId: number) {
    this.sendOrderShowFormularyPopUp.emit({id:transactionLoanAssocId, order:'visualization'});

  }

}
