import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-transaction-tags',
  templateUrl: './transaction-tags.component.html',
  styleUrls: ['./transaction-tags.component.css']
})
export class TransactionTagsComponent {
  @Output() sendOrderCloseFormularyPopUp = new EventEmitter<any>();

  closeFormularyPopUp() {
    this.sendOrderCloseFormularyPopUp.emit();
  }
}
