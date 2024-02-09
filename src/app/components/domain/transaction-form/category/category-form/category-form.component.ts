import { Component, OnInit, inject } from '@angular/core';
import { CategoryModel } from 'src/app/models/category/category.model';
import { CategoryService } from 'src/app/services/category/category.service';
import { AuthenticationService } from 'src/app/services/user/authentication.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

  userId: number = 0;
  category: CategoryModel = new CategoryModel();

  _oauthService = inject(AuthenticationService);
  _categoryService = inject(CategoryService);

  constructor() {
    this.userId = this._oauthService.getIdFromToken();
  }

  ngOnInit() {
  }

  getByIdAndUserId(idCategory: number) {
    this._categoryService.getByIdAndUserId(idCategory, this.userId).subscribe({
      next: (response) => {
        this.category = response;
      },
      error: (error: any) => {
        alert(error.error.message);
      }
    });
  }

  register() {
    this._categoryService.createByUserId(this.category, this.userId).subscribe({
      next: (response: CategoryModel) => {
        console.log(response);
      },
      error: (error: any) => {
        console.log(error.error.message);
        alert(error.error.message);
      }
    });
  }

  update() {
    this._categoryService.updateByIdAndUserId(this.category.id, this.category, this.userId).subscribe({
      next: (response: CategoryModel) => {
        console.log(response);
      },
      error: (error: any) => {
        console.log(error.error.message);
        alert(error.error.message);
      }
    });
  }
  
}