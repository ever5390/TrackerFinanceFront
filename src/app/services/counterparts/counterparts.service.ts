import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CounterPartModel } from 'src/app/models/counterPartModel/counterpart.model';
import { enviroment } from 'src/enviroments/enviroment';
@Injectable({
  providedIn: 'root'
})
export class CounterpartsService {

  private hostApi: string = enviroment.urlApi;
  private _httpClient = inject(HttpClient);

  constructor() { }

  createByUserId(counterPart: CounterPartModel, workspaceId: number): Observable<CounterPartModel> {
    const url = `${this.hostApi}/workspace/${workspaceId}/counterparts`;
    return this._httpClient.post<CounterPartModel>(url, counterPart);
  }

  readAllByUserId(workspaceId: number): Observable<CounterPartModel[]> {
    const url = `${this.hostApi}/workspace/${workspaceId}/counterparts`;
    return this._httpClient.get<CounterPartModel[]>(url);
  }

  updateByIdAndUserId(id: number, counterPart: CounterPartModel, workspaceId: number): Observable<CounterPartModel> {
    const url = `${this.hostApi}/workspace/${workspaceId}/counterparts/${id}`;
    return this._httpClient.put<CounterPartModel>(url, counterPart);
  }

  deleteByIdAndUserId(id: number, workspaceId: number): Observable<void> {
    const url = `${this.hostApi}/workspace/${workspaceId}/counterparts/${id}`;
    return this._httpClient.delete<void>(url);
  }

  getByIdAndUserId(id: number, workspaceId: number): Observable<CounterPartModel> {
    const url = `${this.hostApi}/workspace/${workspaceId}/counterparts/${id}`;
    return this._httpClient.get<CounterPartModel>(url);
  }
}
