import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AccountModel } from 'src/app/models/account/account.model';
import { enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private hostApi: string = enviroment.urlApi;
  private httClient = inject(HttpClient); //Angular 16


  constructor() { }

  
  createByUserId(accountRequest: AccountModel, workspaceId: number): Observable<AccountModel> {
    const url = `${this.hostApi}/workspace/${workspaceId}/accounts`;
    return this.httClient.post<AccountModel>(url, accountRequest);
  }

  readAllByUserId(workspaceId: number): Observable<AccountModel[]> {
    const url = `${this.hostApi}/workspace/${workspaceId}/accounts`;
    return this.httClient.get<AccountModel[]>(url);
  }

  updateByIdAndUserId(id: number, accountRequest: AccountModel, workspaceId: number): Observable<AccountModel> {
    const url = `${this.hostApi}/workspace/${workspaceId}/accounts/${id}`;
    return this.httClient.put<AccountModel>(url, accountRequest);
  }

  deleteByIdAndUserId(id: number, workspaceId: number): Observable<void> {
    const url = `${this.hostApi}/workspace/${workspaceId}/accounts/${id}`;
    return this.httClient.delete<void>(url);
  }

  getByIdAndUserId(id: number, workspaceId: number): Observable<AccountModel> {
    const url = `${this.hostApi}/workspace/${workspaceId}/accounts/${id}`;
    return this.httClient.get<AccountModel>(url);
  }


}
