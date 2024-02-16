import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LinksComponentsService {

  private subjectRequest = new Subject<any>();
  getOrderReload$ = this.subjectRequest.asObservable();

  sendOrderReaload(order: any): void {
    this.subjectRequest.next(order);
  }

}