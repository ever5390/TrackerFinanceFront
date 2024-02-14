import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageBoxService {

  private subjectResponse = new Subject<any>();
  getDataResponse$ = this.subjectResponse.asObservable();

  private subjectRequest = new Subject<any>();
  getDataRequest$ = this.subjectRequest.asObservable();

  sendDateResponse(data: any): void {
    console.log("service message subject: " + data);
    this.subjectResponse.next(data);
  }

  sendDateRequest(data: any): void {
    console.log("service message subject: " + data);
    this.subjectRequest.next(data);
  }

}
