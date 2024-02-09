import { Component, OnInit, inject } from '@angular/core';
import { ResumenMovementDto } from 'src/app/dto/movementDto/movement-resume-dto.model';
import { Type } from 'src/app/emuns/Type.enum';
import { TransactionFilters } from 'src/app/models/transaction-filters/transaction-filters.model';
import { TransactionService } from 'src/app/services/transaction/transaction.service';
import { AuthenticationService } from 'src/app/services/user/authentication.service';

@Component({
  selector: 'app-movement-list',
  templateUrl: './movement-list.component.html',
  styleUrls: ['./movement-list.component.css']
})
export class MovementListComponent implements OnInit{

  filters: TransactionFilters = new TransactionFilters();
  userId: number = 0;
  movementResume: ResumenMovementDto = new ResumenMovementDto();

  //Injects
  transactionService = inject(TransactionService);
  oauthService = inject(AuthenticationService);

  constructor() {
    this.filters.type = Type.TRANSFERENCE;
    this.userId = this.oauthService.getIdFromToken();
  }

  ngOnInit(): void {
    this.getAllMovementsByUserId();
  }

  getAllMovementsByUserId() {
    this.transactionService.readAllResumeByUserIdAndFilters(this.userId, this.filters).subscribe({
      next: (data: ResumenMovementDto) => {
        this.movementResume = data;
        console.log(this.movementResume);
      },
      error: (error: any) => {
        console.error(error.error.message);
      } 
   });
  }


}
