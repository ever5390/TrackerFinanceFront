import { Component, OnInit, inject } from '@angular/core';
import { PaymentMethodModel } from 'src/app/models/payment-method/payment-method.model';
import { PaymentMethodService } from 'src/app/services/payment-method/payment-method.service';
import { AuthenticationService } from 'src/app/services/user/authentication.service';

@Component({
  selector: 'app-payment-method-form',
  templateUrl: './payment-method-form.component.html',
  styleUrls: ['./payment-method-form.component.css']
})
export class PaymentMethodFormComponent  implements OnInit {

  userId: number = 0;
  paymentMethod: PaymentMethodModel = new PaymentMethodModel();

  _oauthService = inject(AuthenticationService);
  _peymentMethodService = inject(PaymentMethodService);

  constructor() {
    this.userId = this._oauthService.getIdFromToken();
  }

  ngOnInit() {
  }

  getByIdAndUserId(merberId: number) {
    this._peymentMethodService.getByIdAndUserId(merberId, this.userId).subscribe({
      next: (response) => {
        this.paymentMethod = response;
      },
      error: (error: any) => {
        alert(error.error.message);
      }
    });
  }

  register() {
    this._peymentMethodService.createByUserId(this.paymentMethod, this.userId).subscribe({
      next: (response: PaymentMethodModel) => {
        console.log(response);
      },
      error: (error: any) => {
        console.log(error.error.message);
        alert(error.error.message);
      }
    });
  }

  update() {
    this._peymentMethodService.updateByIdAndUserId(this.paymentMethod.id, this.paymentMethod, this.userId).subscribe({
      next: (response: PaymentMethodModel) => {
        console.log(response);
      },
      error: (error: any) => {
        console.log(error.error.message);
        alert(error.error.message);
      }
    });
  }
  
}
