import { Component } from '@angular/core';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent {
  flagShowMaskAsctions: boolean = false;
  orderCloseormularyPopUp: boolean = true;

  showMaskAsctions() {
    this.flagShowMaskAsctions = !this.flagShowMaskAsctions;
  }

  receiveOrderCloseFormularyPopUp() {
    this.orderCloseormularyPopUp = false;
  }
}
