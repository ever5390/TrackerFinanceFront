import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-transaction-counterpart',
  templateUrl: './transaction-counterpart.component.html',
  styleUrls: ['./transaction-counterpart.component.css']
})
export class TransactionCounterpartComponent {
  @Output() sendOrderCloseFormularyPopUp = new EventEmitter<any>();

  closeFormularyPopUp() {
    this.sendOrderCloseFormularyPopUp.emit();
  }
}
