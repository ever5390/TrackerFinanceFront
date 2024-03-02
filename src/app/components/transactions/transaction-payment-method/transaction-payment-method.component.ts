import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { PaymentMethodModel } from 'src/app/models/payment-method/payment-method.model';
import { PaymentMethodService } from 'src/app/services/payment-method/payment-method.service';

@Component({
  selector: 'app-transaction-payment-method',
  templateUrl: './transaction-payment-method.component.html',
  styleUrls: ['./transaction-payment-method.component.css']
})
export class TransactionPaymentMethodComponent {
  @Input("accountIdReceived") accountIdReceived : number = 0;
  @Output() sendOrderCloseFormularyPopUp = new EventEmitter<any>();
  @Output() sendItemSelected = new EventEmitter<any>();

  _paymentMethodService = inject(PaymentMethodService);
  paymentMethods: PaymentMethodModel[] = [];
  itemsSearched: PaymentMethodModel[] = [];
  workspaceId: number = 0;

  constructor() {
    this.workspaceId = parseInt(localStorage.getItem("workspaceId") || '0');
    setTimeout(() => {
      this.getAll();
    }, 300);
  }

  getAll() {
    this._paymentMethodService.readAllByAccountIdAndWorkspaceId(this.accountIdReceived, this.workspaceId).subscribe({
      next:(response) =>{
        this.paymentMethods = response;
        this.itemsSearched = response;
      },
      error:(error: any)=> {
        alert(error.error.message);
      }
    });
  }

  itemSelected(itemSelected: PaymentMethodModel) {
    this.sendItemSelected.emit({"object":itemSelected, "type":"paymentMethod"});
  }

  closeFormularyPopUp() {
    this.sendOrderCloseFormularyPopUp.emit();
  }
}

