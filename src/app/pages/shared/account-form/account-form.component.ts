import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { AccountModel } from 'src/app/models/account/account.model';
import { CardType } from 'src/app/models/cardType/cardType.model';
import { PaymentMethodModel } from 'src/app/models/payment-method/payment-method.model';
import { AccountService } from 'src/app/services/account/account.service';
import { AuthenticationService } from 'src/app/services/user/authentication.service';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.css']
})
export class AccountFormComponent implements OnInit{
  
  @Output() sendOrderCloseFormularyPopUp = new EventEmitter<any>();
  @Input("idAccountReceived") idAccountReceived : number = 0;
  @Input("nameSearchedReceive") nameSearchedReceive : string = '';

  _oauthService = inject(AuthenticationService);
  _accountService = inject(AccountService);
  
  account: AccountModel = new AccountModel();

  workspaceId: number = 0;

  flagShowFormCardType: boolean = false;

  constructor(){
    this.workspaceId = parseInt(localStorage.getItem("workspaceId") || '0');
  }

  ngOnInit(): void {

    if(this.nameSearchedReceive != '') 
      this.account.name = this.nameSearchedReceive; 
    
    if(this.idAccountReceived != 0) 
      this.getByIdAndUserId(this.idAccountReceived);
    
  }

  closeFormularyPopUp() {
    this.sendOrderCloseFormularyPopUp.emit();
  }

  receiveCardTypeSelected(cardTypeReceived: CardType) {
    this.account.cardType = cardTypeReceived;
    this.flagShowFormCardType = false;
  }

  receivePaymentsMethodsSelected(event: PaymentMethodModel[]) {
    const pmselected = event.filter(pm=>pm.isChecked==true);
    this.account.paymentMethods = pmselected;
  }

  getByIdAndUserId(idAccount: number) {
    this._accountService.getByIdAndUserId(idAccount, this.workspaceId).subscribe({
      next: (response) => {
        this.account = response;
      },
      error: (error: any) => {
        alert(error.error.message);
      }
    });
  }

  createAccount() {
    this._accountService.createByUserId(this.account, this.workspaceId).subscribe({
      next: (response) => {
        alert("Cuenta creada correctamente");
        this.closeFormularyPopUp();
      },
      error: (error: any) => {
        alert(error.error.message);
      }
    });
  }

  updateAccount() {
    this._accountService.updateByIdAndUserId(this.idAccountReceived, this.account, this.workspaceId).subscribe({
      next: (response) => {
        alert("Cuenta actualizada correctamente");
        this.closeFormularyPopUp();
      },
      error: (error: any) => {
        alert(error.error.message);
      }
    });
  }

}
