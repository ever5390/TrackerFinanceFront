import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CardType } from 'src/app/models/cardType/cardType.model';
import { enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class CardTypeService {

  private hostApi: string = enviroment.urlApi;
  private _httpClient = inject(HttpClient);

  constructor() { }

  createByUserId(cardType: CardType, workspaceId: number): Observable<CardType> {
    const url = `${this.hostApi}/workspace/${workspaceId}/cardtype`;
    return this._httpClient.post<CardType>(url, cardType);
  }

  readAllByUserId(workspaceId: number): Observable<CardType[]> {
    const url = `${this.hostApi}/workspace/${workspaceId}/cardtype`;
    return this._httpClient.get<CardType[]>(url);
  }

  updateByIdAndUserId(id: number, cardType: CardType, workspaceId: number): Observable<CardType> {
    const url = `${this.hostApi}/workspace/${workspaceId}/cardtype/${id}`;
    return this._httpClient.put<CardType>(url, cardType);
  }

  deleteByIdAndUserId(id: number, workspaceId: number): Observable<void> {
    const url = `${this.hostApi}/workspace/${workspaceId}/cardtype/${id}`;
    return this._httpClient.delete<void>(url);
  }

  getByIdAndUserId(id: number, workspaceId: number): Observable<CardType> {
    const url = `${this.hostApi}/workspace/${workspaceId}/cardtype/${id}`;
    return this._httpClient.get<CardType>(url);
  }
}
