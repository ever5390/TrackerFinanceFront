import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { GroupCategoryModel } from 'src/app/models/groupCategory/category.model';
import { enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class GroupCategoryService {

  private hostApi: string = enviroment.urlApi;
  private httClient = inject(HttpClient); //Angular 16
  
  constructor() { }
  
    createByUserId(category: GroupCategoryModel, workspaceId: number): Observable<GroupCategoryModel> {
      const url = `${this.hostApi}/workspace/${workspaceId}/categories`;
      return this.httClient.post<GroupCategoryModel>(url, category);
    }

    readAllByUserId(workspaceId: number): Observable<GroupCategoryModel[]> {
      const url = `${this.hostApi}/workspace/${workspaceId}/categories`;
      return this.httClient.get<GroupCategoryModel[]>(url);
    }
  
    updateByIdAndUserId(id: number, category: GroupCategoryModel, workspaceId: number): Observable<GroupCategoryModel> {
      const url = `${this.hostApi}/workspace/${workspaceId}/categories/${id}`;
      return this.httClient.put<GroupCategoryModel>(url, category);
    }
  
    deleteByIdAndUserId(id: number, workspaceId: number): Observable<void> {
      const url = `${this.hostApi}/workspace/${workspaceId}/categories/${id}`;
      return this.httClient.delete<void>(url);
    }

    getByIdAndUserId(id: number, workspaceId: number): Observable<GroupCategoryModel> {
      const url = `${this.hostApi}/workspace/${workspaceId}/categories/${id}`;
      return this.httClient.get<GroupCategoryModel>(url);
    }

}
