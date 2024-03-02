import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ResumenMovementDto } from 'src/app/dto/movementDto/movement-resume-dto.model';

@Component({
  selector: 'app-data-resume',
  templateUrl: './data-resume.component.html',
  styleUrls: ['./data-resume.component.css']
})
export class DataResumeComponent {

  @Input("resumenMovementDto") dataBalanceResume: ResumenMovementDto = new ResumenMovementDto();
  orderCloseormularyPopUp: boolean = false;

  @Output() sendOrderShowFormularyPopUp = new EventEmitter<any>();


  showFormTransaction() {
    this.sendOrderShowFormularyPopUp.emit(0);
  }

}
