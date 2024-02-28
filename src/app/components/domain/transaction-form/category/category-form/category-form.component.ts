import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CategoryModel } from 'src/app/models/category/category.model';
import { CategoryService } from 'src/app/services/category/category.service';
import { AuthenticationService } from 'src/app/services/user/authentication.service';

@Component({
  selector: 'app-category-form-last',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent {

  @Input("categoryReceivedFromCategories") categoryReceivedFromCategories :CategoryModel = new CategoryModel();
  @Input("textHeaderReceivedFromCategories") textHeaderReceivedFromCategories :string = '';
  @Output() sendOrderClosePopUp = new EventEmitter<any>();
  @Output() sentSuccessfullyProcessingFromFormulary = new EventEmitter<any>();

  userId: number = 0;

  category: CategoryModel = new CategoryModel();

  _oauthService = inject(AuthenticationService);
  _categoryService = inject(CategoryService);

  textActionButton: string = "Registrar nuevo";

  constructor() {
    this.userId = this._oauthService.getIdFromToken();
  }

  backForm() {
    this.sendOrderClosePopUp.emit();
  }

  saveChanges() {
    //setting values from data received
    this.category.name = this.categoryReceivedFromCategories.name;
    //send to save changes
    this.register(this.category);
  }

  register(categoryReceived: CategoryModel) {
    this._categoryService.createByUserId(categoryReceived, this.userId).subscribe({
      next: (response: CategoryModel) => {
        alert(response.name + " agregado correctamente");
        this.sentSuccessfullyProcessingFromFormulary.emit();
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

  getByIdAndUserId() {
    this._categoryService.getByIdAndUserId(this.category.id, this.userId).subscribe({
      next: (response) => {
        this.category = response;
      },
      error: (error: any) => {
        alert(error.error.message);
      }
    });
  }
  
}