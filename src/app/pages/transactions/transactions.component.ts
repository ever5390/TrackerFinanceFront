import { Component, inject } from '@angular/core';
import { optionItemsConst } from 'src/app/components/transactions/transaction-form/type-const.constant';
import { ResumenMovementDto } from 'src/app/dto/movementDto/movement-resume-dto.model';
import { TransactionFilters } from 'src/app/models/transaction-filters/transaction-filters.model';
import { TransactionModel } from 'src/app/models/transaction/transaction.model';
import { TransactionService } from 'src/app/services/transaction/transaction.service';
import { AuthenticationService } from 'src/app/services/user/authentication.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent {

  orderCloseormularyPopUp: boolean = false;

  _oauthService = inject(AuthenticationService);
  _transactionService = inject(TransactionService);

  transactions: TransactionModel[] = [];
  transaction: TransactionModel = new TransactionModel();

  resumenMovementDto: ResumenMovementDto = new ResumenMovementDto();

  filters: TransactionFilters = new TransactionFilters();

  workspaceId: number = 0;
  idTransactionToSendUpdate: number = 0;

  optionConst : any[] = optionItemsConst; 

  constructor(){
    this.workspaceId = parseInt(localStorage.getItem("workspaceId") || '0');
    this.getAllByUserId();
  }

  receiveOrderCloseFormularyPopUp(idTransaction: any) {
    this.idTransactionToSendUpdate = idTransaction;
    this.orderCloseormularyPopUp = !this.orderCloseormularyPopUp;
  }

  receivedReloadTransactionsOrderFromFormularyTx() {
    this.orderCloseormularyPopUp = !this.orderCloseormularyPopUp;
    this.getAllByUserId();
  }
  

  getAllByUserId() {
    this._transactionService.readAllResumeByUserIdAndFilters(this.workspaceId, this.filters).subscribe({
      next: (response : any) => {
        console.log(response);
        this.resumenMovementDto = response;
        this.transactions = response.movememts;
      },
      error: (error: any) => {
        alert(error.error.message);
        console.log("Errorrrr");
      }
    });
  }

}
