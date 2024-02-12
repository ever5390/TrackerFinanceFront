import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { AccountModel } from 'src/app/models/account/account.model';
import { AccountService } from 'src/app/services/account/account.service';
import { AuthenticationService } from 'src/app/services/user/authentication.service';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.css']
})
export class AccountFormComponent{
  @Input("accountReceivedFromSegments") accountReceivedFromSegments :AccountModel = new AccountModel();
  @Input("textHeaderReceivedFromAccounts") textHeaderReceivedFromAccounts :string = '';
  @Output() sentSuccessfullyProcessingFromFormulary = new EventEmitter<any>();
  @Output() sendOrderClosePopUp = new EventEmitter<any>();


  userId: number = 0;
  account: AccountModel = new AccountModel();

  _oauthService = inject(AuthenticationService);
  _accountService = inject(AccountService);

  textActionButton: string = "Registrar nuevo";

  constructor() {
    this.userId = this._oauthService.getIdFromToken();
  }

  backForm() {
    this.sendOrderClosePopUp.emit();
  }

  saveChanges() {
    //setting values from data received
    this.account.name = this.accountReceivedFromSegments.name;
    this.account.currentBalance = this.accountReceivedFromSegments.currentBalance;
    //send to save changes
    this.register(this.account);
  }

  getByIdAndUserId(idAccount: number) {
    this._accountService.getByIdAndUserId(idAccount, this.userId).subscribe({
      next: (response) => {
        this.account = response;
      },
      error: (error: any) => {
        alert(error.error.message);
      }
    });
  }

  register(accountReceived: AccountModel) {
    this._accountService.createByUserId(accountReceived, this.userId).subscribe({
      next: (response: AccountModel) => {
        alert(response.name + " agregado correctamente");
        this.sentSuccessfullyProcessingFromFormulary.emit();
      },
      error: (error: any) => {
        console.log(error.error.message);
        alert(error.error.message);
      }
    });
  }

  update() {
    this._accountService.updateByIdAndUserId(this.account.id, this.account, this.userId).subscribe({
      next: (response: AccountModel) => {
        console.log(response);
      },
      error: (error: any) => {
        console.log(error.error.message);
        alert(error.error.message);
      }
    });
  }
  
}

