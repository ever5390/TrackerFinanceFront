import { Component, EventEmitter, Output, inject } from '@angular/core';
import { Status } from 'src/app/emuns/Status.enum';
import { Type } from 'src/app/emuns/Type.enum';
import { TransactionModel } from 'src/app/models/transaction/transaction.model';
import { TransactionService } from 'src/app/services/transaction/transaction.service';

@Component({
  selector: 'app-transaction-loan-assoc',
  templateUrl: './transaction-loan-assoc.component.html',
  styleUrls: ['./transaction-loan-assoc.component.css']
})
export class TransactionLoanAssocComponent {

  @Output() sendOrderCloseFormularyPopUp = new EventEmitter<any>();
  @Output() sendItemSelected = new EventEmitter<any>();

  _transactionService = inject(TransactionService);
  transactionsLoan: TransactionModel[] = [];

  workspaceId: number = 0;

  constructor() {
    this.workspaceId = parseInt(localStorage.getItem("workspaceId") || '0');
    this.getAllByLoan();
  }

  getAllByLoan() {
    this._transactionService.getAllLoanByUserId(Type.LOAN, Status.PENDING, this.workspaceId).subscribe({
      next:(response) =>{
        this.transactionsLoan = response;
      },
      error:(error: any)=> {
        alert(error.error.message);
      }
    });
  }

  itemSelected(itemSelected: TransactionModel) {
    this.sendItemSelected.emit({"object":itemSelected, "type":"transactionLoan"});
  }

  closeFormularyPopUp() {
    this.sendOrderCloseFormularyPopUp.emit();
  }
}
