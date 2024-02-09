import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-types-transactions',
  templateUrl: './types-transactions.component.html',
  styleUrls: ['./types-transactions.component.css']
})
export class TypesTransactionsComponent {
  
  @Input("operationTypesReceived") operationTypesReceived : any[] = [];
  @Input("receivedTextHeaderForm") receivedTextHeaderForm :string = '';

  @Output() sendTypeSelected = new EventEmitter<any>();
  
  constructor(){}


  itemSelected(typeSelected: string) {
    this.sendTypeSelected.emit(typeSelected);
  }
}
