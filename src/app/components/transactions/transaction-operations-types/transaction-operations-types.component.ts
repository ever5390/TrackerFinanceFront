import { Component, EventEmitter, Output } from '@angular/core';
import { optionItemsConst } from '../transaction-form/type-const.constant';

@Component({
  selector: 'app-transaction-operations-types',
  templateUrl: './transaction-operations-types.component.html',
  styleUrls: ['./transaction-operations-types.component.css']
})
export class TransactionOperationsTypesComponent {
  @Output() sendOrderCloseFormularyPopUp = new EventEmitter<any>();
  @Output() sendItemSelected = new EventEmitter<any>();


  optionConst : any[] = optionItemsConst; 

  
  sendItemSelectedMethod(itemSelected: string) {
    this.sendItemSelected.emit(this.optionConst.find(item=>item.name === itemSelected));
  }
  
  closeFormularyPopUp() {
    this.sendOrderCloseFormularyPopUp.emit();
  }
}
