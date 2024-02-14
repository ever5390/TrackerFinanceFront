import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MessageBoxService } from 'src/app/services/message-box/message-box.service';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.css']
})
export class MessageBoxComponent implements OnInit{

  agregarClase = false;
  showmessage: string = '';

  constructor( private _messageBoxService : MessageBoxService) {}

  ngOnInit(): void {
    this._messageBoxService.getDataRequest$.subscribe({
      next: (data: any) => {
        console.log(data);
        this.showmessage = data.message;
        this.agregarClase = !this.agregarClase;
      },
      error: error => {
        console.error('Error al recibir datos del servicio:', error.error);
      }
    });
  }

  // Método para cambiar la variable agregarClase
  cambiarClase() {
      this.agregarClase = !this.agregarClase; // Invertir el valor actual
  }
}
