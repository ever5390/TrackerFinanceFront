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

  createByUserId(paymentMethodRequest: PaymentMethodModel, workspaceId: number): Observable<PaymentMethodModel> {
    const url = `${this.hostApi}/workspace/${workspaceId}/payment-methods`;
    return this.httClient.post<PaymentMethodModel>(url, paymentMethodRequest);
  }

  readAllByUserId(workspaceId: number): Observable<PaymentMethodModel[]> {
    const url = `${this.hostApi}/workspace/${workspaceId}/payment-methods`;
    return this.httClient.get<PaymentMethodModel[]>(url);
  }

  readAllByAccountIdAndWorkspaceId(accountId: number , workspaceId: number): Observable<PaymentMethodModel[]> {
    const url = `${this.hostApi}/workspace/${workspaceId}/payment-methods/account/${accountId}`;
    return this.httClient.get<PaymentMethodModel[]>(url);
  }

  updateByIdAndUserId(id: number, paymentMethodRequest: PaymentMethodModel, workspaceId: number): Observable<PaymentMethodModel> {
    const url = `${this.hostApi}/workspace/${workspaceId}/payment-methods/${id}`;
    return this.httClient.put<PaymentMethodModel>(url, paymentMethodRequest);
  }

  deleteByIdAndUserId(id: number, workspaceId: number): Observable<void> {
    const url = `${this.hostApi}/workspace/${workspaceId}/payment-methods/${id}`;
    return this.httClient.delete<void>(url);
  }

  getByIdAndUserId(id: number, workspaceId: number): Observable<PaymentMethodModel> {
    const url = `${this.hostApi}/workspace/${workspaceId}/payment-methods/${id}`;
    return this.httClient.get<PaymentMethodModel>(url);
  }
}
