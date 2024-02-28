import { Component, EventEmitter, Output } from '@angular/core';
import { TransactionModel } from 'src/app/models/transaction/transaction.model';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css']
})
export class TransactionFormComponent {

  @Output() sendOrderCloseFormularyPopUp = new EventEmitter<any>();

  itemsPopUps: any[] = [
    {"name":"category", "show":false},
    {"name":"account", "show":false},
    {"name":"accountDestiny", "show":false},
    {"name":"operation", "show":false},
    {"name":"tags", "show":false},
    {"name":"counterpart", "show":false},
    {"name":"recurrency", "show":false}
  ]

  transaction: TransactionModel = new TransactionModel();
  operationTypeReceived: any;

  receiveTypeOperationItemSelected(itemSelectedType: any) {
    this.operationTypeReceived = itemSelectedType;
    this.transaction.type = itemSelectedType.original;
    this.transaction.action = itemSelectedType.action;
    console.log(this.transaction.type);
    this.closeAllPopUpsByItem();
  }







  // ::::: BEGIN :::: metodos para abrir y cerrar los popUps

  closeFormularyPopUp() {
    this.sendOrderCloseFormularyPopUp.emit();
  }

  closeAllPopUpsByItem() {
    this.itemsPopUps.forEach( i => {
      i.show = false;
    });
  }

  showPopUpByItem(item: string) {
    this.itemsPopUps.forEach( i => {
      i.show = false;
      if(i.name == item)
        i.show = true;
    });
  }

  shouldShowComponent(componentName: string): boolean {
    const item = this.itemsPopUps.find(item => item.name === componentName);
    return item ? item.show : false;
  }

    // ::::: END :::: metodos para abrir y cerrar los popUps


}
