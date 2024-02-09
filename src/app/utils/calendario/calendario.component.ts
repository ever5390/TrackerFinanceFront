import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent{

  @Output() sendDateSelectedFromCalendar = new EventEmitter<any>();
  @Input("receivedOderDateCalendar") receivedOderDateCalendar = "";

  calendars: any[] = [];
  diasSemana: string[] = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  meses: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  constructor() {
    // Inicializar los dos calendars con el mes y anio actual
    const fechaActual = new Date();
    this.calendars.push({ mes: fechaActual.getMonth(), anio: fechaActual.getFullYear() });
    //this.calendars.push({ mes: fechaActual.getMonth() + 1, anio: fechaActual.getFullYear() });
  }

  changeMonth(index: number, incremento: number): void {
    const calendario = this.calendars[index];
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


  selectDate(day: number, month: number, year: number) {
    this.sendDateSelectedFromCalendar.emit({dateSelected: new Date(year, month, day), order: this.receivedOderDateCalendar});
  }

}
