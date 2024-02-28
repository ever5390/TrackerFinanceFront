import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css']
})
export class TransactionFormComponent {
  @Output() sendOrderCloseFormularyPopUp = new EventEmitter<any>();

  closeFormularyPopUp() {
    this.sendOrderCloseFormularyPopUp.emit();
  }
}
