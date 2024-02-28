import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-transaction-accounts',
  templateUrl: './transaction-accounts.component.html',
  styleUrls: ['./transaction-accounts.component.css']
})
export class TransactionAccountsComponent {
  @Output() sendOrderCloseFormularyPopUp = new EventEmitter<any>();

  closeFormularyPopUp() {
    this.sendOrderCloseFormularyPopUp.emit();
  }
}
