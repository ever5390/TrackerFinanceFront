import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { MemberModel } from 'src/app/models/member/member.model';
import { enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private hostApi: string = enviroment.urlApi;
  private httClient = inject(HttpClient); //Angular 16


  constructor() { }

  createByUserId(memberRequest: MemberModel, userId: number): Observable<MemberModel> {
    const url = `${this.hostApi}/user/${userId}/members`;
    return this.httClient.post<MemberModel>(url, memberRequest);
  }

  readAllByUserId(userId: number): Observable<MemberModel[]> {
    const url = `${this.hostApi}/user/${userId}/members`;
    return this.httClient.get<MemberModel[]>(url);
  }

  updateByIdAndUserId(id: number, memberRequest: MemberModel, userId: number): Observable<MemberModel> {
    const url = `${this.hostApi}/user/${userId}/members/${id}`;
    return this.httClient.put<MemberModel>(url, memberRequest);
  }

  deleteByIdAndUserId(id: number, userId: number): Observable<void> {
    const url = `${this.hostApi}/user/${userId}/members/${id}`;
    return this.httClient.delete<void>(url);
  }

  getByIdAndUserId(id: number, userId: number): Observable<MemberModel> {
    const url = `${this.hostApi}/user/${userId}/members/${id}`;
    return this.httClient.get<MemberModel>(url);
  }
}
