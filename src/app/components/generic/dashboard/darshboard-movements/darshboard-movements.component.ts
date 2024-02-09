import { Component, Input } from '@angular/core';
import { MovementDto } from 'src/app/dto/movementDto/movement-dto.model';
import { ResumenMovementDto } from 'src/app/dto/movementDto/movement-resume-dto.model';

@Component({
  selector: 'app-darshboard-movements',
  templateUrl: './darshboard-movements.component.html',
  styleUrls: ['./darshboard-movements.component.css']
})
export class DarshboardMovementsComponent {

  @Input("movementsReceived") movementsReceived: MovementDto[] = [];

}
