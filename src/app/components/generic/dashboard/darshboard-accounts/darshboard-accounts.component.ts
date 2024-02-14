import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { AccountModel } from 'src/app/models/account/account.model';
import { AccountService } from 'src/app/services/account/account.service';
import { AuthenticationService } from 'src/app/services/user/authentication.service';


@Component({
  selector: 'app-darshboard-accounts',
  templateUrl: './darshboard-accounts.component.html',
  styleUrls: ['./darshboard-accounts.component.css']
})
export class DarshboardAccountsComponent {
  
  @Input("orderResetReceived") orderResetReceived: string = '';
  @Input("orderReloadAccountReceived") orderReloadAccountReceived: boolean = false;
  @Output() childEvent = new EventEmitter<string>();

  userId: number = 0;
  accounts: AccountModel[] = [];
  account: AccountModel = new AccountModel();

  _oauthService = inject(AuthenticationService);
  _accountService = inject(AccountService);

  constructor() {
    this.userId = this._oauthService.getIdFromToken();

  }

  ngOnInit() {
    if(this.orderReloadAccountReceived == true) {
      this.getAllByUserId();
    }
    this.getAllByUserId();
  }

  sendNameAccountToParentFilter(accountName: string) {
    this.orderResetReceived = accountName;
    this.childEvent.emit(accountName);
  }

  getAllByUserId() {
    this._accountService.readAllByUserId(this.userId).subscribe({
      next: (response) => {
        this.accounts = response;
      },
      error: (error: any) => {
        alert(error.error.message);
      }
    });
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

  deleteByIdAndUserId(idAccount: number) {
    this._accountService.deleteByIdAndUserId(idAccount, this.userId).subscribe({
      next: (response) => {
        alert(response);
      },
      error: (error: any) => {
        alert(error.error.message);
      }
    });
  }

}
