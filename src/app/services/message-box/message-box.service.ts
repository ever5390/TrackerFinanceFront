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
    this.subjectResponse.next(data);
  }

  sendDateRequest(data: any): void {
    this.subjectRequest.next(data);
  }

}
