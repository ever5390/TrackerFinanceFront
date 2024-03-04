import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CardType } from 'src/app/models/cardType/cardType.model';
import { CardTypeService } from 'src/app/services/cardTtype/card-type.service';

@Component({
  selector: 'app-card-type-form',
  templateUrl: './card-type-form.component.html',
  styleUrls: ['./card-type-form.component.css']
})
export class CardTypeFormComponent {
  @Output("sendCardTypeSelected") sendCardTypeSelected = new EventEmitter<any>();
  
  _cardtypeService = inject(CardTypeService);
  
  cardTypes: CardType[] = [];
  cardTypeSearched: CardType[] = [];
  cardType: CardType = new CardType();

  cardTypeSearch: string = "";
  workspaceId: number = 0;

  cardTypeSelected: CardType = new CardType();


  constructor(){
    this.workspaceId = parseInt(localStorage.getItem("workspaceId") || '0');
    this.getAllByWorkspaceId();
  }

  getAllByWorkspaceId() {
    this._cardtypeService.readAllByUserId(this.workspaceId).subscribe({
      next: (response) => {
        this.cardTypes = response;
        this.cardTypeSearched = response;
      },
      error: (error: any) => {
        alert(error.error.message);
      }
    });
  }

  create() {
    this._cardtypeService.createByUserId(this.cardType, this.workspaceId).subscribe({
      next: (response) => {
        this.getAllByWorkspaceId();
      },
      error: (error: any) => {
        alert(error.error.message);
      }
    });
  }

  receiveDataFromSearch(event: any) {
    this.cardTypeSearch = event.text;
    this.cardType.name = event.text;

    this.cardTypes = event.data;
    if(this.cardTypeSearch == '')
      this.cardTypes = this.cardTypeSearched;
  }

  onItemChange() {
    this.sendCardTypeSelected.emit(this.cardTypeSelected);
  }

}
