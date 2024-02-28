import { Component } from '@angular/core';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent {
  flagShowMaskAsctions: boolean = false;
  orderCloseormularyPopUp: boolean = false;

  showMaskAsctions() {
    this.flagShowMaskAsctions = !this.flagShowMaskAsctions;
  }

  receiveOrderCloseFormularyPopUp() {
    this.orderCloseormularyPopUp = false;
  }
}
