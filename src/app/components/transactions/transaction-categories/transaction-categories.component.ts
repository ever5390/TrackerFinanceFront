import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-transaction-categories',
  templateUrl: './transaction-categories.component.html',
  styleUrls: ['./transaction-categories.component.css']
})
export class TransactionCategoriesComponent {
  @Output() sendOrderCloseFormularyPopUp = new EventEmitter<any>();

  closeFormularyPopUp() {
    this.sendOrderCloseFormularyPopUp.emit();
  }
}
