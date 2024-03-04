import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ResumenMovementDto } from 'src/app/dto/movementDto/movement-resume-dto.model';

@Component({
  selector: 'app-data-resume',
  templateUrl: './data-resume.component.html',
  styleUrls: ['./data-resume.component.css']
})
export class DataResumeComponent {

  @Input("resumenMovementDto") dataBalanceResume: ResumenMovementDto = new ResumenMovementDto();
  @Output() sendOrderShowFormularyPopUp = new EventEmitter<any>();
  @Output("sendDateRangeSelected") sendDateRangeSelected = new EventEmitter<any>();


  orderCloseormularyPopUp: boolean = false;
  itemSelectShow : string = 'Mes(es)';
  textByItemSelect : string = 'Último';
  cant:number = 1;

  filteOptions: any = [{optionShow:"Día(s)", option:"Día", cant:1, text:"Último(s)"},
                       {optionShow:"Día(s)", option:"Días", cant:2, text:"Último(s)"},
                       {optionShow:"Semana(s)", option:"Semana", cant:1, text:"Última(s)"},
                       {optionShow:"Semana(s)", option:"Semanas", cant:2, text:"Última(s)"},
                       {optionShow:"Mes(es)", option:"Mes", cant:1, text:"Último(s)"},
                       {optionShow:"Mes(es)", option:"Meses", cant:2, text:"Último(s)"},
                       {optionShow:"Año(s)", option:"Año", cant:1, text:"Último(s)"},
                       {optionShow:"Año(s)", option:"Año(s)", cant:1, text:"Último(s)"}]
  
  uniqueOptionShows: any;
  uniqueOptions: any;

  endDate: Date = new Date();
  beginDate: Date = new Date();

  flagShowCalendar: boolean = false;

  constructor() {
    this.uniqueOptionShows = Array.from(new Set(this.filteOptions.map((option: { optionShow: any; }) => option.optionShow)));
    this.formarUniquesOptions();
  }

  formarUniquesOptions() {
    this.uniqueOptions = this.uniqueOptionShows.map((optionShow: any) => {
      return this.filteOptions.find((option: { optionShow: any; }) => option.optionShow === optionShow);
    });
    console.log(this.uniqueOptions);

  }

  showFormTransaction() {
    this.sendOrderShowFormularyPopUp.emit({id:0, order:'new'});
  }

  optionSelected: any;
  showItemSelected(itemSelected: any) {
    this.itemSelectShow = itemSelected.optionShow;
    this.textByItemSelect = itemSelected.text;
  }

  sendDateRange() {
    this.beginDate = new Date();
    switch (this.itemSelectShow) {
      case "Día(s)":
        this.beginDate.setDate(this.beginDate.getDate() - (this.cant-1));
        break;
      case "Semana(s)":
        this.beginDate.setDate(this.beginDate.getDate() - 6*this.cant);
        break;
      case "Mes(es)":
        let newMonth = this.beginDate.getMonth() - (this.cant-1);

        // Ajustar el año si es necesario
        while (newMonth < 0) {
            this.beginDate.setFullYear(this.beginDate.getFullYear() - 1);
            newMonth += 12;
        }

        // Establecer el nuevo mes
        this.beginDate.setDate(1);
        this.beginDate.setMonth(newMonth);
        break;
      case "Año(s)":
        let newYear = this.beginDate.getFullYear() - (this.cant-1);
        this.beginDate.setFullYear(newYear);
        this.beginDate.setDate(1);
        this.beginDate.setMonth(0);
        break;        
      default:
        break;
    }

    this.beginDate.setHours(0,0,0)
    this.filtrar();
  }

  beginOrEndDate: string = "";
  showCalendar(typeSelected: string) {
    this.flagShowCalendar = true;
    this.beginOrEndDate = typeSelected;
  }

  receivedDateSelectedFromCalendar(dataRangeSelect: any) {

    if(dataRangeSelect == undefined) {
      this.flagShowCalendar = false;
      return;
    }

    if(this.beginOrEndDate == "beginDate")
      this.beginDate = dataRangeSelect.dateSelected;

    if(this.beginOrEndDate == "endDate")
      this.endDate = dataRangeSelect.dateSelected;

    this.flagShowCalendar = false;
  }

  filtrar() {
    this.sendDateRangeSelected.emit({beginDate: this.beginDate, endDate: this.endDate});
  }

}
