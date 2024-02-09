import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { CategoryModel } from 'src/app/models/category/category.model';
import { enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private hostApi: string = enviroment.urlApi;
  private token: string | null = "" ;

  private httClient = inject(HttpClient); //Angular 16
  
  constructor() { }
  
    createByUserId(category: CategoryModel, userId: number): Observable<CategoryModel> {
      const url = `${this.hostApi}/user/${userId}/categories`;
      return this.httClient.post<CategoryModel>(url, category);
    }

    readAllByUserId(userId: number): Observable<CategoryModel[]> {
      const url = `${this.hostApi}/user/${userId}/categories`;
      return this.httClient.get<CategoryModel[]>(url);
    }
  
    updateByIdAndUserId(id: number, category: CategoryModel, userId: number): Observable<CategoryModel> {
      const url = `${this.hostApi}/user/${userId}/categories/${id}`;
      return this.httClient.put<CategoryModel>(url, category);
    }
  
    deleteByIdAndUserId(id: number, userId: number): Observable<void> {
      const url = `${this.hostApi}/user/${userId}/categories/${id}`;
      return this.httClient.delete<void>(url);
    }

    getByIdAndUserId(id: number, userId: number): Observable<CategoryModel> {
      const url = `${this.hostApi}/user/${userId}/categories/${id}`;
      return this.httClient.get<CategoryModel>(url);
    }

}
