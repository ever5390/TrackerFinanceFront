import { Component, Input, OnInit, inject } from '@angular/core';
import { PaymentMethodModel } from 'src/app/models/payment-method/payment-method.model';
import { PaymentMethodService } from 'src/app/services/payment-method/payment-method.service';
import { AuthenticationService } from 'src/app/services/user/authentication.service';

@Component({
  selector: 'app-payment-method-list',
  templateUrl: './payment-method-list.component.html',
  styleUrls: ['./payment-method-list.component.css']
})
export class PaymentMethodListComponent implements OnInit {
  @Input("receivedTextHeaderForm") receivedTextHeaderForm :string = '';

  userId: number = 0;
  paymentMethods: PaymentMethodModel[] = [];
  paymentMethod: PaymentMethodModel = new PaymentMethodModel();

  _oauthService = inject(AuthenticationService);
  _paymentMethodService = inject(PaymentMethodService);

  constructor() {
    this.userId = this._oauthService.getIdFromToken();
    console.log(this.userId);
  }

  ngOnInit() {
    this.getAllByUserId();
  }

  getAllByUserId() {
    console.log(this.userId);
    this._paymentMethodService.readAllByUserId(this.userId).subscribe({
      next: (response) => {
        this.paymentMethods = response;
        console.log(response);
      },
      error: (error: any) => {
        alert(error.error.message);
      }
    });
  }

  getByIdAndUserId(paymentMethodId: number) {
    this._paymentMethodService.getByIdAndUserId(paymentMethodId, this.userId).subscribe({
      next: (response) => {
        this.paymentMethod = response;
      },
      error: (error: any) => {
        alert(error.error.message);
      }
    });
  }

  deleteByIdAndUserId(paymentMethodId: number) {
    this._paymentMethodService.deleteByIdAndUserId(paymentMethodId, this.userId).subscribe({
      next: (response) => {
        alert(response);
      },
      error: (error: any) => {
        alert(error.error.message);
      }
    });
  }
  
}
