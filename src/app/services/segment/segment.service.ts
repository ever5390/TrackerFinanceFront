import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { SegmentModel } from 'src/app/models/segment/segment.model';
import { enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class SegmentService {

  private hostApi: string = enviroment.urlApi;
  private httClient = inject(HttpClient); //Angular 16

  constructor() { }

  createByUserId(segmentRequest: SegmentModel, userId: number): Observable<SegmentModel> {
    const url = `${this.hostApi}/user/${userId}/segments`;
    return this.httClient.post<SegmentModel>(url, segmentRequest);
  }

  readAllByUserId(userId: number): Observable<SegmentModel[]> {
    const url = `${this.hostApi}/user/${userId}/segments`;
    return this.httClient.get<SegmentModel[]>(url);
  }

  updateByIdAndUserId(id: number, segmentRequest: SegmentModel, userId: number): Observable<SegmentModel> {
    const url = `${this.hostApi}/user/${userId}/segments/${id}`;
    return this.httClient.put<SegmentModel>(url, segmentRequest);
  }

  deleteByIdAndUserId(id: number, userId: number): Observable<void> {
    const url = `${this.hostApi}/user/${userId}/segments/${id}`;
    return this.httClient.delete<void>(url);
  }

  getByIdAndUserId(id: number, userId: number): Observable<SegmentModel> {
    const url = `${this.hostApi}/user/${userId}/segments/${id}`;
    return this.httClient.get<SegmentModel>(url);
  }
}
