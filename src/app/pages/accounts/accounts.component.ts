import { Component, inject } from '@angular/core';
import { AccountModel } from 'src/app/models/account/account.model';
import { AccountService } from 'src/app/services/account/account.service';
import { AuthenticationService } from 'src/app/services/user/authentication.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent {

  flagShowMaskAsctions: boolean = false;
  orderShowPopUp: boolean = false;

  _oauthService = inject(AuthenticationService);
  _accountService = inject(AccountService);

  accounts: AccountModel[] = [];
  account: AccountModel = new AccountModel();

  workspaceId: number = 0;
  accountIdToSendUpdate: number = 0;

  constructor(){
    this.workspaceId = parseInt(localStorage.getItem("workspaceId") || '0');

    this.getAllByUserId();
  }

  showMaskAsctions(account: AccountModel) {
    this.accounts.map(item =>  {
      item.selected = false;
      if(item.id == account.id){
        item.selected = true;
      }
    });
    this.flagShowMaskAsctions = !this.flagShowMaskAsctions;
  }

  receiveOrderCloseFormularyPopUp() {
    this.accountIdToSendUpdate = 0;
    this.orderShowPopUp = false;
    this.getAllByUserId();
  }

  getAllByUserId() {
    this._accountService.readAllByUserId(this.workspaceId).subscribe({
      next: (response) => {
        this.accounts = response;
      },
      error: (error: any) => {
        alert(error.error.message);
        console.log("Errorrrr");
      }
    });
  }

  updateAccount(idAccount: number) {
    this.accountIdToSendUpdate = idAccount;
    this.flagShowMaskAsctions = !this.flagShowMaskAsctions;
    this.orderShowPopUp = true;
  }


  deleteByIdAndUserId(idAccount: number) {
    this._accountService.deleteByIdAndUserId(idAccount, this.workspaceId).subscribe({
      next: (response) => {
        alert(response);
      },
      error: (error: any) => {
        alert(error.error.message);
      }
    });
  }
}
