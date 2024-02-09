import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { PaymentMethodModel } from 'src/app/models/payment-method/payment-method.model';
import { enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {

  private hostApi: string = enviroment.urlApi;
  private httClient = inject(HttpClient); //Angular 16

  constructor() { }

  createByUserId(paymentMethodRequest: PaymentMethodModel, userId: number): Observable<PaymentMethodModel> {
    const url = `${this.hostApi}/user/${userId}/payment-methods`;
    return this.httClient.post<PaymentMethodModel>(url, paymentMethodRequest);
  }

  readAllByUserId(userId: number): Observable<PaymentMethodModel[]> {
    const url = `${this.hostApi}/user/${userId}/payment-methods`;
    return this.httClient.get<PaymentMethodModel[]>(url);
  }

  updateByIdAndUserId(id: number, paymentMethodRequest: PaymentMethodModel, userId: number): Observable<PaymentMethodModel> {
    const url = `${this.hostApi}/user/${userId}/payment-methods/${id}`;
    return this.httClient.put<PaymentMethodModel>(url, paymentMethodRequest);
  }

  deleteByIdAndUserId(id: number, userId: number): Observable<void> {
    const url = `${this.hostApi}/user/${userId}/payment-methods/${id}`;
    return this.httClient.delete<void>(url);
  }

  getByIdAndUserId(id: number, userId: number): Observable<PaymentMethodModel> {
    const url = `${this.hostApi}/user/${userId}/payment-methods/${id}`;
    return this.httClient.get<PaymentMethodModel>(url);
  }
}
