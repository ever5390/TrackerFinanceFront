import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent{

  @Output() sendDateSelectedFromCalendar = new EventEmitter<any>();
  @Input("receiveGetInitOrFinalDate") receiveGetInitOrFinalDate = "";

  // calendars: any[] = [];

  diasSemana: string[] = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  meses: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  timesHours = [...Array(24).keys()].map(i => this.pad(i));
  timesMinAndSecs = [...Array(60).keys()].map(i => this.pad(i));
  hourActivated: boolean = true;
  hour: string = "00";
  minute: string = "00";
  second: string = "00";
  activateTime: string = "hour";

  currentDate: Date = new Date();
  calendar : any;

  constructor(private _renderer: Renderer2, private elementRef: ElementRef) {
    // Inicializar los dos calendars con el mes y anio actual
    const fechaActual = new Date();
    this.calendar = {mes: fechaActual.getMonth(), anio: fechaActual.getFullYear() }
    // this.calendars.push({ mes: fechaActual.getMonth(), anio: fechaActual.getFullYear() });
  }




  activateBlockHour(activate: string) {
    this.activateTime = activate
    if(activate == "hour") this.hourActivated = true;
    else  this.hourActivated = false;
  }

  selecTimes(timeSelected: string) {
    switch (this.activateTime) {
      case "hour":
        this.hour = timeSelected;
        break;
      case "minute":
        this.minute = timeSelected;
        break;
      case "second":
        this.second = timeSelected;
        break;   
      default:
        break;
    }
  }

  pad(num: number): string {
    return (num.toString().length < 2)?`0${num}`:`${num}`;
  }

  changeMonth(incremento: number): void {
    // const calendario = this.calendars[index];
    const calendario = this.calendar;
    calendario.mes += incremento;
    if (calendario.mes < 0) {
      calendario.mes = 11;
      calendario.anio--;
    } else if (calendario.mes > 11) {
      calendario.mes = 0;
      calendario.anio++;
    }
  }

  getDiasEnMes(mes: number, anio: number): number {
    return new Date(anio, mes + 1, 0).getDate(); //número de día del mes [1..28129,30 ó 31]
  }

  generarDias(mes: number, anio: number): any[] {
    const primerDia = new Date(anio, mes, 1).getDay(); //Día de la semana [1...7]
    const totalDias = this.getDiasEnMes(mes, anio);
    const dias: any[] = [];

    const ultimoDiaMesAnterior = this.getDiasEnMes(mes - 1, anio);

    // Añadir los últimos días del mes anterior
    for (let i = ultimoDiaMesAnterior - primerDia + 1; i < ultimoDiaMesAnterior+1; i++) {
      dias.push({index:-1, day: i.toString()});
    }

    // Añadir los días del mes
    for (let i = 1; i <= totalDias; i++) {
      dias.push({index:0, day: i.toString()});
    }

    const ultimoDia = new Date(anio, mes, totalDias).getDay();

    // Añadir los últimos días del mes anterior
    for (let i = 1; i < 7- ultimoDia; i++) {
      dias.push({index:1, day: i.toString()});
    }

    return dias;
  }


  date: Date = new Date();
  selectDate(day: number, month: number, year: number, indexDay: number) {
    this.date = new Date(year, month, day, parseInt(this.hour), parseInt(this.minute));
    // console.log( "Date select total: " + new Date(year, month, day, parseInt(this.hour), parseInt(this.minute)));
    // if(indexDay == 0) this.sendDateSelectedFromCalendar.emit({dateSelected: new Date(year, month, day, parseInt(this.hour), parseInt(this.minute)), order: this.receiveGetInitOrFinalDate});
  }

  sendDateSelected() {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), parseInt(this.hour), parseInt(this.minute));
    console.log(" date select OK: " + this.date);
    this.sendDateSelectedFromCalendar.emit({dateSelected: this.date, order: this.receiveGetInitOrFinalDate});
  }
}
