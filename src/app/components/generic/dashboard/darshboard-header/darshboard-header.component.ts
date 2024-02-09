import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-darshboard-header',
  templateUrl: './darshboard-header.component.html',
  styleUrls: ['./darshboard-header.component.css']
})
export class DarshboardHeaderComponent {
  
  @Output() sendOrderShowTransactionRegister = new EventEmitter<any>();
  @Output() sendOrderCloseTransactionRegisterAndReloadRows = new EventEmitter<any>();
  // @Input("receivedInitialDateCalendarReceived") receivedInitialDateCalendarReceived: string = ""; 

  fullName: string = '';
  actualDate: Date = new Date();
  horaActual: Date = new Date();
  
  constructor(){
    this.fullName = JSON.stringify(localStorage.getItem("fullName"));
  }

  ngOnInit(): void {
    // Iniciar el reloj
    this.actualizarHora();
    setInterval(() => {
      this.actualizarHora();
    }, 1000);
  }

  // Método para actualizar la hora actual
  actualizarHora(): void {
    this.horaActual = new Date();
  }

  showTransactionRegister() {
    this.sendOrderShowTransactionRegister.emit();
  }
}
