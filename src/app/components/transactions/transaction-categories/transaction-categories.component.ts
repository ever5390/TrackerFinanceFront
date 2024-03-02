import { Component, EventEmitter, Output, inject } from '@angular/core';
import { SubCategoryModel } from 'src/app/models/subCategory/subCategory.model';
import { SubCategoryService } from 'src/app/services/subCategory/subcategory.service';

@Component({
  selector: 'app-transaction-categories',
  templateUrl: './transaction-categories.component.html',
  styleUrls: ['./transaction-categories.component.css']
})
export class TransactionCategoriesComponent {
  @Output() sendOrderCloseFormularyPopUp = new EventEmitter<any>();
  @Output() sendItemSelected = new EventEmitter<any>();

  _subCategoryService = inject(SubCategoryService);
  subcategories: SubCategoryModel[] = [];
  itemsSearched: SubCategoryModel[] = [];

  workspaceId: number = 0;

  constructor() {
    this.workspaceId = parseInt(localStorage.getItem("workspaceId") || '0');
    this.getAll();
  }

  getAll() {
    this._subCategoryService.readAllByUserId(this.workspaceId).subscribe({
      next:(response) =>{
        this.subcategories = response;
        this.itemsSearched = response;
      },
      error:(error: any)=> {
        alert(error.error.message);
      }
    });
  }

  itemSelected(itemSelected: SubCategoryModel) {
    console.log("item:" + itemSelected);
    this.sendItemSelected.emit({"object":itemSelected, "type":"subcategory"});
  }

  closeFormularyPopUp() {
    this.sendOrderCloseFormularyPopUp.emit();
  }
}
