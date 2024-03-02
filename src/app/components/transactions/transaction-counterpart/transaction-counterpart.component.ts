import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CounterPartModel } from 'src/app/models/counterPartModel/counterpart.model';
import { CounterpartsService } from 'src/app/services/counterparts/counterparts.service';

@Component({
  selector: 'app-transaction-counterpart',
  templateUrl: './transaction-counterpart.component.html',
  styleUrls: ['./transaction-counterpart.component.css']
})
export class TransactionCounterpartComponent {
  @Output() sendOrderCloseFormularyPopUp = new EventEmitter<any>();
  @Output() sendItemSelected = new EventEmitter<any>();

  _counterPartsService = inject(CounterpartsService);
  counterparts: CounterPartModel[] = [];
  counterpartsSearched: CounterPartModel[] = [];

  newCounterpart: CounterPartModel = new CounterPartModel();
  textSearch: string = '';
  workspaceId: number = 0;

  constructor() {
    this.workspaceId = parseInt(localStorage.getItem("workspaceId") || '0');
    this.getAllCounterParts();
  }

  getAllCounterParts() {
    this._counterPartsService.readAllByUserId(this.workspaceId).subscribe({
      next:(response) =>{
        this.counterparts = response;
        this.counterpartsSearched = response;
      },
      error:(error: any)=> {
        alert(error.error.message);
      }
    });
  }

  itemSelected(counterPartSelected: CounterPartModel) {
    this.sendItemSelected.emit({"object":counterPartSelected, "type":"countepart"});
  }

  receiveDataFromSearch(event: any) {
    this.newCounterpart.name = event.text;
    this.textSearch = event.text;
    this.counterparts = event.data;
    if(this.textSearch == '')
      this.counterparts = this.counterpartsSearched;
  }

  createCounterpart() {
    this._counterPartsService.createByUserId(this.newCounterpart, this.workspaceId).subscribe({
      next: (response) => {
        this.getAllCounterParts();
      },
      error: (error: any) => {
        alert(error.error.message);
      }
    });
  }

  closeFormularyPopUp() {
    this.sendOrderCloseFormularyPopUp.emit();
  }
}
