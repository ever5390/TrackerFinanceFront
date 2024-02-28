import { Component } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {

  flagShowMaskAsctions: boolean = false;
  orderCloseormularyPopUp: boolean = false;

  showMaskAsctions() {
    this.flagShowMaskAsctions = !this.flagShowMaskAsctions;
  }

  receiveOrderCloseFormularyPopUp() {
    this.orderCloseormularyPopUp = false;
  }

}
