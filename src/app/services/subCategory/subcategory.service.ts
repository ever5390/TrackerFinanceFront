import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { SubCategoryModel } from 'src/app/models/subCategory/subCategory.model';
import { enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {

  private hostApi: string = enviroment.urlApi;
  private httClient = inject(HttpClient); //Angular 16

  constructor() { }

  createByUserId(subcategoryRequest: SubCategoryModel, workspaceId: number): Observable<SubCategoryModel> {
    const url = `${this.hostApi}/workspace/${workspaceId}/subcategories`;
    return this.httClient.post<SubCategoryModel>(url, subcategoryRequest);
  }

  readAllByUserId(workspaceId: number): Observable<SubCategoryModel[]> {
    const url = `${this.hostApi}/workspace/${workspaceId}/subcategories`;
    return this.httClient.get<SubCategoryModel[]>(url);
  }

  updateByIdAndUserId(id: number, subcategoryRequest: SubCategoryModel, workspaceId: number): Observable<SubCategoryModel> {
    const url = `${this.hostApi}/workspace/${workspaceId}/subcategories/${id}`;
    return this.httClient.put<SubCategoryModel>(url, subcategoryRequest);
  }

  deleteByIdAndUserId(id: number, workspaceId: number): Observable<void> {
    const url = `${this.hostApi}/workspace/${workspaceId}/subcategories/${id}`;
    return this.httClient.delete<void>(url);
  }

  getByIdAndUserId(id: number, workspaceId: number): Observable<SubCategoryModel> {
    const url = `${this.hostApi}/workspace/${workspaceId}/subcategories/${id}`;
    return this.httClient.get<SubCategoryModel>(url);
  }
}
