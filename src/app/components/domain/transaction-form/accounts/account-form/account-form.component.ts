import { Component, OnInit, inject } from '@angular/core';
import { AccountModel } from 'src/app/models/account/account.model';
import { AccountService } from 'src/app/services/account/account.service';
import { AuthenticationService } from 'src/app/services/user/authentication.service';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.css']
})
export class AccountFormComponent implements OnInit {

  userId: number = 0;
  account: AccountModel = new AccountModel();

  _oauthService = inject(AuthenticationService);
  _accountService = inject(AccountService);

  constructor() {
    this.userId = this._oauthService.getIdFromToken();
  }

  ngOnInit() {
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

  register() {
    this._accountService.createByUserId(this.account, this.userId).subscribe({
      next: (response: AccountModel) => {
        console.log(response);
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

