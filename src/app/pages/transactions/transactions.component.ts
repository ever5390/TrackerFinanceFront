import { Component, inject } from '@angular/core';
import { optionItemsConst } from 'src/app/components/transactions/transaction-form/type-const.constant';
import { ResumenMovementDto } from 'src/app/dto/movementDto/movement-resume-dto.model';
import { TransactionFilters } from 'src/app/models/transaction-filters/transaction-filters.model';
import { TransactionModel } from 'src/app/models/transaction/transaction.model';
import { LinksComponentsService } from 'src/app/services/links-components/links-components.service';
import { TransactionService } from 'src/app/services/transaction/transaction.service';
import { AuthenticationService } from 'src/app/services/user/authentication.service';
import { Utils } from 'src/app/utils/utils.component';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent {

  orderCloseormularyPopUp: boolean = false;

  _oauthService = inject(AuthenticationService);
  _transactionService = inject(TransactionService);

  transactions: TransactionModel[] = [];
  transaction: TransactionModel = new TransactionModel();

  resumenMovementDto: ResumenMovementDto = new ResumenMovementDto();

  filters: TransactionFilters = new TransactionFilters();

  workspaceId: number = 0;
  sendOrdershowFormulary: any = 0;

  optionConst : any[] = optionItemsConst; 

  constructor(private _linkService: LinksComponentsService){
    this.workspaceId = parseInt(localStorage.getItem("workspaceId") || '0');
    this.getAllByUserId();
    this.showFormTransaction();
  }

  showFormTransaction() {
    this._linkService.getOrderReload$.subscribe({
      next: (data: any) => {
        console.log(data);
        this.getAllByUserId();
      },
      error: error => {
        console.error('Error al recibir datos del servicio:', error.error);
      }
    });
  }

  receivedDeleteConfirm() {
    this.getAllByUserId();
  }

  receiveOrderCloseFormularyPopUp(event: any) {
    this.sendOrdershowFormulary = event;
    this.orderCloseormularyPopUp = !this.orderCloseormularyPopUp;
  }

  receivedReloadTransactionsOrderFromFormularyTx() {
    this.orderCloseormularyPopUp = !this.orderCloseormularyPopUp;
    this.getAllByUserId();
  }

  receiveDateRangeSelected(dateRange: any) {
    this.filters.startDate = Utils.formatDate(dateRange.beginDate);
    this.filters.endDate = Utils.formatDate(dateRange.endDate);
    this.getAllByUserId();
  }
  

  getAllByUserId() {
    this._transactionService.readAllResumeByUserIdAndFilters(this.workspaceId, this.filters).subscribe({
      next: (response : any) => {
        this.resumenMovementDto = response;
        this.transactions = response.movememts;
      },
      error: (error: any) => {
        alert(error.error.message);
        console.log("Errorrrr");
      }
    });
  }

}
