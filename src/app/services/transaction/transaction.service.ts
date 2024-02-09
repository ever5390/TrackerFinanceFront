import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ResumenMovementDto } from 'src/app/dto/movementDto/movement-resume-dto.model';
import { TransactionFilters } from 'src/app/models/transaction-filters/transaction-filters.model';
import { TransactionModel } from 'src/app/models/transaction/transaction.model';
import { enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private hostApi: string = enviroment.urlApi;
  private httpClient = inject(HttpClient); //Angular 16

  constructor() { }

  createByUserId(TransactionRequest: TransactionModel, userId: number): Observable<TransactionModel> {
    const url = `${this.hostApi}/user/${userId}/transactions`;
    return this.httpClient.post<TransactionModel>(url, TransactionRequest);
  }

  readAllResumeByUserId(userId: number): Observable<ResumenMovementDto> {
    const url = `${this.hostApi}/user/${userId}/transactions/resume`;
    return this.httpClient.get<ResumenMovementDto>(url);
  }

  updateByIdAndUserId(id: number, TransactionRequest: TransactionModel, userId: number): Observable<TransactionModel> {
    const url = `${this.hostApi}/user/${userId}/transactions/${id}`;
    return this.httpClient.put<TransactionModel>(url, TransactionRequest);
  }

  deleteByIdAndUserId(id: number, userId: number): Observable<void> {
    const url = `${this.hostApi}/user/${userId}/transactions/${id}`;
    return this.httpClient.delete<void>(url);
  }

  getByIdAndUserId(id: number, userId: number): Observable<TransactionModel> {
    const url = `${this.hostApi}/user/${userId}/transactions/${id}`;
    return this.httpClient.get<TransactionModel>(url);
  }

  readAllResumeByUserIdAndFilters(userId: number, filters: TransactionFilters): Observable<ResumenMovementDto> {
    let url = `${this.hostApi}/user/${userId}/transactions/filters`;
    if (filters) {
      url += `?startDate=${filters.startDate}&endDate=${filters.endDate}&type=${filters.type}&status=${filters.status}&category=${filters.category}&description=${filters.description}&segment=${filters.segment}&account=${filters.account}&paymentMethod=${filters.paymentMethod}&block=${filters.block}&action=${filters.action}`;
    }
    console.log(url);
    return this.httpClient.get<ResumenMovementDto>(url);
  }
}
