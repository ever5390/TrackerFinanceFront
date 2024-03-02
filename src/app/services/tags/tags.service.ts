import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Tag } from 'src/app/models/tag/tag.model';
import { enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  private hostApi: string = enviroment.urlApi;
  private httClient = inject(HttpClient); //Angular 16

  constructor() { }
  
  createByUserId(tagRequest: Tag, workspaceId: number): Observable<Tag> {
    const url = `${this.hostApi}/workspace/${workspaceId}/tags`;
    return this.httClient.post<Tag>(url, tagRequest);
  }

  readAllByUserId(workspaceId: number): Observable<Tag[]> {
    const url = `${this.hostApi}/workspace/${workspaceId}/tags`;
    return this.httClient.get<Tag[]>(url);
  }

  updateByIdAndUserId(id: number, tagRequest: Tag, workspaceId: number): Observable<Tag> {
    const url = `${this.hostApi}/workspace/${workspaceId}/tags/${id}`;
    return this.httClient.put<Tag>(url, tagRequest);
  }

  deleteByIdAndUserId(id: number, workspaceId: number): Observable<void> {
    const url = `${this.hostApi}/workspace/${workspaceId}/tags/${id}`;
    return this.httClient.delete<void>(url);
  }

  getByIdAndUserId(id: number, workspaceId: number): Observable<Tag> {
    const url = `${this.hostApi}/workspace/${workspaceId}/tags/${id}`;
    return this.httClient.get<Tag>(url);
  }
}