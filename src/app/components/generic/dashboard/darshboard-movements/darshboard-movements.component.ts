import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { MovementDto } from 'src/app/dto/movementDto/movement-dto.model';
import { ResumenMovementDto } from 'src/app/dto/movementDto/movement-resume-dto.model';
import { Item } from 'src/app/interfaces/ItemFiltered.interface';
import { TransactionModel } from 'src/app/models/transaction/transaction.model';
import { TransactionService } from 'src/app/services/transaction/transaction.service';
import { AuthenticationService } from 'src/app/services/user/authentication.service';

@Component({
  selector: 'app-darshboard-movements',
  templateUrl: './darshboard-movements.component.html',
  styleUrls: ['./darshboard-movements.component.css']
})
export class DarshboardMovementsComponent implements OnInit{
  @Input("movementsReceived") movementsReceived: MovementDto[] = [];
  @Input("totalMovements") totalMovements: number= 0;
  @Input("receiveItemFilteredToMovement") receiveItemFilteredToMovement: Item[] = [];
  @Output() sendItemRemoveToFilterFromMovement = new EventEmitter<any>();

  
  userId: number = 0;
  oauthService = inject(AuthenticationService);
  constructor(private _transactionService: TransactionService){
    console.log(this.receiveItemFilteredToMovement);
  }


  ngOnInit(): void {
  }

  showTransactionRegister() {
   // this.sendOrderShowTransactionRegister.emit();
  }

  removeFilter(itemRemove: any) {
    this.sendItemRemoveToFilterFromMovement.emit(itemRemove);
  }

}
