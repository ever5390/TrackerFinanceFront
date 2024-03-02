import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { AccountModel } from 'src/app/models/account/account.model';
import { AccountService } from 'src/app/services/account/account.service';

@Component({
  selector: 'app-transaction-accounts',
  templateUrl: './transaction-accounts.component.html',
  styleUrls: ['./transaction-accounts.component.css']
})
export class TransactionAccountsComponent {
  @Input("accountDestinyReceived") accountDestinyReceived : string = '';
  @Output() sendOrderCloseFormularyPopUp = new EventEmitter<any>();
  @Output() sendItemSelected = new EventEmitter<any>();

  _accountsService = inject(AccountService);
  accounts: AccountModel[] = [];
  itemsSearched: AccountModel[] = [];
  accounDestinyText: string ="";
  workspaceId: number = 0;

  constructor() {
    this.workspaceId = parseInt(localStorage.getItem("workspaceId") || '0');
    setTimeout(() => {
      this.accounDestinyText = this.accountDestinyReceived=="account"?"":"destino";
    }, 100);
    this.getAllCounterParts();
  }

  getAllCounterParts() {
    this._accountsService.readAllByUserId(this.workspaceId).subscribe({
      next:(response) =>{
        this.accounts = response;
        this.itemsSearched = response;
      },
      error:(error: any)=> {
        alert(error.error.message);
      }
    });
  }

  itemSelected(itemSelected: AccountModel) {
    this.sendItemSelected.emit({"object":itemSelected, "type":this.accountDestinyReceived});
  }

  closeFormularyPopUp() {
    this.sendOrderCloseFormularyPopUp.emit();
  }
}
