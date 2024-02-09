import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Utils } from 'src/app/utils/utils.component';

@Component({
  selector: 'app-darshboard-filters',
  templateUrl: './darshboard-filters.component.html',
  styleUrls: ['./darshboard-filters.component.css']
})
export class DarshboardFiltersComponent {
  @Output() childEvent = new EventEmitter<{ initialDate: string, finalDate: string, text: string }>();
  @Output() sendOrderToShowCalendar = new EventEmitter<any>();

  @Input("receivedInitialDateCalendarReceived") receivedInitialDateCalendarReceived: string = ""; 
  @Input("receivedFinalDateCalendarReceived") receivedFinalDateCalendarReceived: string = ""; 

  initialDate: Date = new Date();
  finalDate: Date = new Date();

  sendInitialFormatDate: string = '';
  sendFinalFormatDate: string = '';

  opciones: string[] = ['Last 7 days', 'Last 15 days', 'Last month', 'Last 2 month'];
  optionSelected: string = this.opciones[0];

  isDropdownOpen = false; // Variable para controlar el estado del dropdown


  //calendar -primeng 15.0.0
  rangeDates: Date[] = [];


  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen; // Cambia el estado del dropdown
  }

  onSelect(opcion: any): void {
      const optionSelected = opcion;
      this.optionSelected = optionSelected;
      this.sendToParentDateFilter(optionSelected);
      this.isDropdownOpen = !this.isDropdownOpen;
  }

  sendToParentDateFilter(typeFilter: string) {

    switch (typeFilter) {
      case "today":
        this.sendInitialFormatDate = Utils.formatDateToInitialDate(this.initialDate, 0, 0, true);
        this.sendFinalFormatDate = Utils.formatDateToActualDate(this.finalDate, true);
        break;
      case "Last 7 days":
        this.sendInitialFormatDate = Utils.formatDateToInitialDate(this.initialDate, 7, 0, true);
        this.sendFinalFormatDate = Utils.formatDateToActualDate(this.finalDate, true);
        break;
      case "Last 15 days":
        this.sendInitialFormatDate = Utils.formatDateToInitialDate(this.initialDate, 15, 0, true);
        this.sendFinalFormatDate = Utils.formatDateToActualDate(this.finalDate, true);
        break;  
      case "Last month":
        this.sendInitialFormatDate = Utils.formatDateToInitialDate(this.initialDate, this.initialDate.getDate() -1 , 0, true);
        this.sendFinalFormatDate = Utils.formatDateToActualDate(this.finalDate, true);
        break;    
      case "Last 2 month":
        this.sendInitialFormatDate = Utils.formatDateToInitialDate(this.initialDate, 0, 1, true);
        this.sendFinalFormatDate = Utils.formatDateToActualDate(this.finalDate, true);
        break;          
      default:
        break;
    }

    this.childEvent.emit({initialDate:this.sendInitialFormatDate, finalDate:this.sendFinalFormatDate, text: typeFilter});
  }

  onInitialDateSelected(fecha: Date): void {
    this.initialDate = fecha;
  }

  onfinalDateSelected(fecha: Date): void {
    this.finalDate = fecha;
  }

  initialSelectDate() {
    this.sendOrderToShowCalendar.emit("initial");
  }

  finalSelectDate() {
    this.sendOrderToShowCalendar.emit("final");
  }

}