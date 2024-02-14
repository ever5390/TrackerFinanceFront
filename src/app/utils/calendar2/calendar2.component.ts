import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-calendar2',
  templateUrl: './calendar2.component.html',
  styleUrls: ['./calendar2.component.css']
})
export class Calendar2Component {

  @Output() sendDateSelectedFromCalendar = new EventEmitter<any>();
  @Input("receiveGetInitOrFinalDate") receiveGetInitOrFinalDate = "";
  @Input("dateReceived") dateReceived = new Date();

  diasSemana: string[] = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  meses: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  timesHours = [...Array(24).keys()].map(i => this.pad(i));
  timesMinAndSecs = [...Array(60).keys()].map(i => this.pad(i));

  year: string = '';
  month: string = '';
  day: string = '';
  hour: string = '';
  minute: string = '';

  hourActivated: boolean = true;
  currentDate: Date = new Date();
  calendar : any;

  constructor(private _renderer: Renderer2, private elementRef: ElementRef) {
    // Inicializar los dos calendars con el mes y anio actual
    const fechaActual = new Date();
    this.setterDateToShow(this.dateReceived);
    this.calendar = {mes: fechaActual.getMonth(), anio: fechaActual.getFullYear() }
  }

  setterDateToShow(dateReceived: Date) {
    this.year = dateReceived.getFullYear().toString();
    this.month = this.pad(dateReceived.getMonth()+1);
    this.day = this.pad(dateReceived.getDate());
    this.hour = this.pad(dateReceived.getHours());
    this.minute = this.pad(dateReceived.getMinutes());
  }

  pad(num: number): string {
    return (num.toString().length < 2)?`0${num}`:`${num}`;
  }

  hourOrMinuteActivated: string = "";
  activateBlockHour(hourOrMinuteActivatedReceived: string) {
    this.hourOrMinuteActivated = hourOrMinuteActivatedReceived;
  }

  selecTimes(timeSelected: string) {
    switch (this.hourOrMinuteActivated) {
      case "hour":
        this.dateReceived.setHours(parseInt(timeSelected));
        break;
      case "minute":
        this.dateReceived.setMinutes(parseInt(timeSelected));
        break;
      default:
        break;
    }

    this.setterDateToShow(this.dateReceived);
  }

  changeMonth(incremento: number): void {

    const calendario = this.calendar;

    // catch last month && year selected
    const lastMonthSelected = calendario.mes;
    const lastYeatSeleceted = calendario.anio;

    // incremenet or decrement month && year
    calendario.mes += incremento;
    if (calendario.mes < 0) {
      calendario.mes = 11;
      calendario.anio--;
    } else if (calendario.mes > 11) {
      calendario.mes = 0;
      calendario.anio++;
    }

    // If the last selected day is greater than the last day of the current selected month, then display the 1st day or the last day
    // depending on whether the previous month is smaller or greater respectively
    this.printDayByLastDayAndMonthSelected(calendario, lastMonthSelected, lastYeatSeleceted);

    //Hide the hours div 
    this.hourOrMinuteActivated = "";

    //Setter month and year to show
    this.dateReceived.setMonth(calendario.mes);
    this.dateReceived.setFullYear(calendario.anio);
    this.setterDateToShow(this.dateReceived);
  }

  private printDayByLastDayAndMonthSelected(calendario: any, lastMonthSelected: any, lastYeatSeleceted: any) {
    //Only when it's the same year, because for the boundaries January and December have the same number of days
    if(calendario.anio == lastYeatSeleceted){
      if (calendario.mes < lastMonthSelected) {
        const lastDayOfLastMonth = this.getDiasEnMes(lastMonthSelected - 1, lastYeatSeleceted);
        if (lastDayOfLastMonth < this.dateReceived.getDate()) {
          this.dateReceived.setDate(lastDayOfLastMonth);
        }
      }
  
      if (calendario.mes > lastMonthSelected) {
        const lastDayOfNextMonth = this.getDiasEnMes(lastMonthSelected + 1, lastYeatSeleceted);
        if (lastDayOfNextMonth < this.dateReceived.getDate()) {
          this.dateReceived.setDate(1);
        }
      }
    } 
  }

  getDiasEnMes(mes: number, anio: number): number {
    return new Date(anio, mes + 1, 0).getDate(); //número de día del mes [1..28,29,30 ó 31]
  }

  generarDias(mes: number, anio: number): any[] {
    const primerDia = new Date(anio, mes, 1).getDay(); //Día de la semana [1...7]
    const totalDias = this.getDiasEnMes(mes, anio);
    const dias: any[] = [];

    const ultimoDiaMesAnterior = this.getDiasEnMes(mes - 1, anio);

    // Añadir los últimos días del mes anterior
    for (let i = ultimoDiaMesAnterior - primerDia + 1; i < ultimoDiaMesAnterior+1; i++) {
      dias.push({indicatorMonth:-1, day: i.toString()});
    }

    // Añadir los días del mes
    for (let i = 1; i <= totalDias; i++) {
      dias.push({indicatorMonth:0, day: i.toString()});
    }

    const ultimoDia = new Date(anio, mes, totalDias).getDay();

    // Añadir los últimos días del mes anterior
    for (let i = 1; i < 7- ultimoDia; i++) {
      dias.push({indicatorMonth:1, day: i.toString()});
    }

    return dias;
  }


  indexSelected: number = 0;
  monthOfSelectedDay: number = 0;
  yearOfSelectedDay: number = 0;
  selectDate(indicatorMonth: number, day: number, month: number, year: number, indexSelected: number) {
    // Setter day to show only
    if(indicatorMonth == 0) {
      this.dateReceived.setDate(day);
      this.setterDateToShow(this.dateReceived);
    }
    
    // Shade the selected day
    if(indicatorMonth == 0) {
      this.monthOfSelectedDay = month;
      this.yearOfSelectedDay = year;
      this.indexSelected = indexSelected; 
    }

    // Hide the hours div 
    this.hourOrMinuteActivated = "";
  }

  sendDateSelected() {
    console.log(" date select OK: " + this.dateReceived);
    this.sendDateSelectedFromCalendar.emit({dateSelected: this.dateReceived, order: this.receiveGetInitOrFinalDate});
  }
}
