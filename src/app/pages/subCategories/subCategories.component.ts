import { Component, inject } from '@angular/core';
import { SubCategoryModel } from 'src/app/models/subCategory/subCategory.model';
import { SubCategoryService } from 'src/app/services/subCategory/subcategory.service';
import { AuthenticationService } from 'src/app/services/user/authentication.service';

@Component({
  selector: 'app-subcategories',
  templateUrl: './subCategories.component.html',
  styleUrls: ['./subCategories.component.css']
})
export class SubCategoriesComponent {

  flagShowMaskAsctions: boolean = false;
  orderShowPopUp: boolean = false;

  workspaceId: number = 0;
  subCategoryIdToSendUpdate: number = 0;

  _oauthService = inject(AuthenticationService);
  _subCategoryService = inject(SubCategoryService);

  subCategories: SubCategoryModel[] = [];
  subCategory: SubCategoryModel = new SubCategoryModel();

  constructor() {
    this.workspaceId = parseInt(localStorage.getItem("workspaceId") || '0');
    this.getAllByUserId();
  }

  showMaskAsctions(categorySelected: SubCategoryModel) {
    this.subCategories.map(item =>  {
      item.selected = false;
      if(item.id == categorySelected.id){
        item.selected = true;
      }
    });
    this.flagShowMaskAsctions = !this.flagShowMaskAsctions;
  }

  getAllByUserId() {
    this._subCategoryService.readAllByUserId(this.workspaceId).subscribe({
      next: (response) => {
        this.subCategories = response;
      },
      error: (error: any) => {
        alert(error.error.message);
        console.log("Errorrrr");
      }
    });
  }

  updateAccount(idSubcategory: number) {
    this.subCategoryIdToSendUpdate = idSubcategory;
    this.flagShowMaskAsctions = !this.flagShowMaskAsctions;
    this.orderShowPopUp = true;
  }

  receiveOrderCloseFormularyPopUp() {
    this.subCategoryIdToSendUpdate = 0;
    this.orderShowPopUp = false;
    this.getAllByUserId();
  }

}
