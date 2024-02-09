import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ResumenMovementDto } from 'src/app/dto/movementDto/movement-resume-dto.model';
import { TransactionFilters } from 'src/app/models/transaction-filters/transaction-filters.model';
import { TransactionService } from 'src/app/services/transaction/transaction.service';
import { AuthenticationService } from 'src/app/services/user/authentication.service';
import { Utils } from 'src/app/utils/utils.component';

@Component({
  selector: 'app-darshboard',
  templateUrl: './darshboard.component.html',
  styleUrls: ['./darshboard.component.css']
})
export class DarshboardPageComponent {

  orderResetSend: string ='default';
  filters: TransactionFilters = new TransactionFilters();
  nameTimeFilter: string = '';
  userId: number = 0;
  movementResume: ResumenMovementDto = new ResumenMovementDto();

  //Injects
  transactionService = inject(TransactionService);
  oauthService = inject(AuthenticationService);


  //Calendar send && received
  
  requestCalendar: string = '';
  flagShowCalendar: boolean = false;
  initialDateCalendarSendPrintFilter: string = Utils.formatDateToInitialDate(new Date(),new Date().getDate() - 1,0, false);
  finalDateCalendarToSendPrintFilter: string = Utils.formatDateToActualDate(new Date(), false);
  initialDateCalendarReceived: Date = new Date();
  finalDateCalendarReceived: Date = new Date();

  constructor(private _router: Router) {
    
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

  //received select name account
  handleChildAccountListToParentDataReceived(accountNameReceived: string) {
    this.orderResetSend = 'default';
    this.filters.account = accountNameReceived;
    this.getAllMovementsByUserId();
  }

  //received select name account
  handleChildFiltersToParentDataReceived(dates: any) {
    this.orderResetSend = 'default';
    this.filters.startDate = dates.initialDate;
    this.filters.endDate = dates.finalDate;
    this.nameTimeFilter = dates.text;
    this.getAllMovementsByUserId();
  }

  handleChildBalanceResumeToParentDataReceived(event: any) {
    //RESET
    this.filters = new TransactionFilters();
    this.nameTimeFilter = '';
    this.orderResetSend = '';
    this.initialDateCalendarSendPrintFilter = Utils.formatDateToInitialDate(new Date(),new Date().getDate() - 1,0, false);
    this.finalDateCalendarToSendPrintFilter = Utils.formatDateToActualDate(new Date(), false);
    this.getAllMovementsByUserId();
  }

  receiveOrderToShowCalendar(event: any) {
      this.requestCalendar = event;
      this.flagShowCalendar = true;
  }

  receivedDateSelectedFromCalendar(event: any) {
    if(event.order == "initial") {
      this.initialDateCalendarReceived = event.dateSelected;
      this.initialDateCalendarSendPrintFilter = Utils.formatDateToInitialDate(event.dateSelected, 0, 0, false);
    }

    if(event.order == "final") {
      this.finalDateCalendarReceived = event.dateSelected;
      this.finalDateCalendarToSendPrintFilter = Utils.formatDateToActualDate(event.dateSelected, false);

      this.nameTimeFilter =  this.initialDateCalendarSendPrintFilter + " - " + this.finalDateCalendarToSendPrintFilter;
      this.filters.startDate = Utils.formatDateToInitialDate(this.initialDateCalendarReceived, 0, 0, true);
      this.filters.endDate =  Utils.formatDateToActualDate(this.finalDateCalendarReceived, true);
      this.getAllMovementsByUserId();
    }

    this.flagShowCalendar = false;
    
  }



  //receive order to show transaction register
  flagShowTransactionRegister: boolean = false;
  receiveOrderShowTransactionRegister() {
    this.flagShowTransactionRegister = true;
    this._router.navigate(['/transaction-register']);
  }

  receiveOrderCloseTransactionRegisterAndReloadRows() {
    this.getAllMovementsByUserId();
  }

}

