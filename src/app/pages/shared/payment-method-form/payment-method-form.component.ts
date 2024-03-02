import { Component, EventEmitter, Output, inject } from '@angular/core';
import { PaymentMethodModel } from 'src/app/models/payment-method/payment-method.model';
import { PaymentMethodService } from 'src/app/services/payment-method/payment-method.service';

@Component({
  selector: 'app-payment-method-form',
  templateUrl: './payment-method-form.component.html',
  styleUrls: ['./payment-method-form.component.css']
})
export class PaymentMethodFormComponent {

  @Output("sendPaymentsMethodsSelected") sendPaymentsMethodsSelected = new EventEmitter<any>();

  _paymentMethodService = inject(PaymentMethodService);
  
  paymentMethods: PaymentMethodModel[] = [];
  paymentMethodsSearched: PaymentMethodModel[] = [];

  paymentMethod: PaymentMethodModel = new PaymentMethodModel();

  paymentSearched: string = "";
  workspaceId: number = 0;

  paymentsSelecteds: PaymentMethodModel[] = [];

  constructor(){
    this.workspaceId = parseInt(localStorage.getItem("workspaceId") || '0');
    this.getAllByUserId();
  }

  getAllByUserId() {
    this._paymentMethodService.readAllByUserId(this.workspaceId).subscribe({
      next: (response) => {
        this.paymentMethods = response.filter(item => item.used == false);
        this.paymentMethodsSearched = response.filter(item => item.used == false);
      },
      error: (error: any) => {
        alert(error.error.message);
      }
    });
  }

  create() {
    this._paymentMethodService.createByUserId(this.paymentMethod, this.workspaceId).subscribe({
      next: (response) => {
        this.getAllByUserId();
      },
      error: (error: any) => {
        alert(error.error.message);
      }
    });
  }

  // update() {
  //   this._paymentMethodService.updateByIdAndUserId(this.idAccountReceived, this.paymentMethod, this.workspaceId).subscribe({
  //     next: (response) => {
  //       alert("Cuenta actualizada correctamente");
  //       this.closeFormularyPopUp();
  //     },
  //     error: (error: any) => {
  //       alert(error.error.message);
  //     }
  //   });
  // }


  receiveDataFromSearch(event: any) {
    this.paymentSearched = event.text;
    this.paymentMethod.name = event.text;
    this.paymentMethod.account = null;

    this.paymentMethods = event.data;
    if(this.paymentSearched == '')
      this.paymentMethods = this.paymentMethodsSearched;
  }

  onChangeCategory(event: any) {
    const idCateSelected = event.target.value;
    const isChecked = event.target.checked;

    this.paymentsSelecteds = this.paymentMethods.map((pay) => {
        if(pay.id == idCateSelected) {
          pay.isChecked = isChecked;
          return pay;
        }
       return pay;
    });
    this.sendPaymentsMethodsSelected.emit(this.paymentsSelecteds);
  }

}
