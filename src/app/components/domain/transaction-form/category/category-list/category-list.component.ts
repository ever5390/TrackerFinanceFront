import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CategoryModel } from 'src/app/models/category/category.model';
import { CategoryService } from 'src/app/services/category/category.service';
import { AuthenticationService } from 'src/app/services/user/authentication.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent  implements OnInit {
  @Input("receivedTextHeaderForm") receivedTextHeaderForm :string = '';
  @Output() sendOrderClosePopUp = new EventEmitter<any>();
  @Output() sendItemSelected = new EventEmitter<{object:any, type: string}>();

  userId: number = 0;
  categories: CategoryModel[] = [];
  category: CategoryModel = new CategoryModel();

  _oauthService = inject(AuthenticationService);
  _categoryService = inject(CategoryService);

  listaCategoriesSendSearch: CategoryModel[] = [];

  constructor() {
    this.userId = this._oauthService.getIdFromToken();
  }

  ngOnInit() {
    this.getAllByUserId();
  }

  back() {
    this.sendOrderClosePopUp.emit();
  }

  flagIsDataFiltered: boolean = false;
  flagDataLoaded: boolean = false;
  textFiltered: string = "";

  receivedDataFromSearch(data : any) {
    this.flagIsDataFiltered = true;
    this.categories = data.data;
    this.textFiltered = data.text;
  }

  showFormulryRegister() {

  }

  catchItemSelected(itemSelected: any) {
    this.sendItemSelected.emit({object: itemSelected, type:"category"});
  }

  getAllByUserId() {
    this._categoryService.readAllByUserId(this.userId).subscribe({
      next: (response) => {
        this.flagDataLoaded = true;
        this.flagIsDataFiltered = false;
        this.listaCategoriesSendSearch = response;
        this.categories = response;
      },
      error: (error: any) => {
        alert(error.error.message);
      }
    });
  }

  getByIdAndUserId(categoryId: number) {
    this._categoryService.getByIdAndUserId(categoryId, this.userId).subscribe({
      next: (response) => {
        this.category = response;
      },
      error: (error: any) => {
        alert(error.error.message);
      }
    });
  }

  deleteByIdAndUserId(categoryId: number) {
    this._categoryService.deleteByIdAndUserId(categoryId, this.userId).subscribe({
      next: (response) => {
        alert(response);
      },
      error: (error: any) => {
        alert(error.error.message);
      }
    });
  }
  
}
