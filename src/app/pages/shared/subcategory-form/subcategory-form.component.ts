import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { GroupCategoryModel } from 'src/app/models/groupCategory/category.model';
import { SubCategoryModel } from 'src/app/models/subCategory/subCategory.model';
import { SubCategoryService } from 'src/app/services/subCategory/subcategory.service';
import { AuthenticationService } from 'src/app/services/user/authentication.service';

@Component({
  selector: 'app-subcategory-form',
  templateUrl: './subcategory-form.component.html',
  styleUrls: ['./subcategory-form.component.css']
})
export class SubCategoryFormComponent {

  @Output() sendOrderCloseFormularyPopUp = new EventEmitter<any>();
  @Input("idCategoryReceived") idCategoryReceived : number = 0;
  _oauthService = inject(AuthenticationService);
  _subCategoryService = inject(SubCategoryService);
  
  subCategory: SubCategoryModel = new SubCategoryModel();

  workspaceId: number = 0;

  constructor(){
    this.workspaceId = parseInt(localStorage.getItem("workspaceId") || '0');
  }

  ngOnInit(): void {
    if(this.idCategoryReceived != 0) {
      this.getByIdAndUserId(this.idCategoryReceived);
    }
  }

  receiveGroupSelected(event: GroupCategoryModel) {
    this.subCategory.category = event;
    console.log("Elemento seleccionado:");
    console.log(event);
  }

  getByIdAndUserId(idAccount: number) {
    this._subCategoryService.getByIdAndUserId(idAccount, this.workspaceId).subscribe({
      next: (response) => {
        this.subCategory = response;
      },
      error: (error: any) => {
        alert(error.error.message);
      }
    });
  }

  create() {
    this._subCategoryService.createByUserId(this.subCategory, this.workspaceId).subscribe({
      next: (response) => {
        alert("SubCategoría creada correctamente");
        this.closeFormularyPopUp();
      },
      error: (error: any) => {
        alert(error.error.message);
      }
    });
  }

  update() {
    this._subCategoryService.updateByIdAndUserId(this.idCategoryReceived, this.subCategory, this.workspaceId).subscribe({
      next: (response) => {
        alert("SubCategoría actualizada correctamente");
        this.closeFormularyPopUp();
      },
      error: (error: any) => {
        alert(error.error.message);
      }
    });
  }

  closeFormularyPopUp() {
    this.sendOrderCloseFormularyPopUp.emit();
  }
}
