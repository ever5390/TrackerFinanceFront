import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { GroupCategoryModel } from 'src/app/models/groupCategory/category.model';
import { GroupCategoryService } from 'src/app/services/groupCategory/category.service';

@Component({
  selector: 'app-groupcategory-form',
  templateUrl: './group-category-form.component.html',
  styleUrls: ['./group-category-form.component.css']
})
export class GroupCategoryFormComponent {
  @Output("sendGroupSelected") sendGroupSelected = new EventEmitter<any>();
  
  _groupCategoryService = inject(GroupCategoryService);
  
  groups: GroupCategoryModel[] = [];
  groupsSearched: GroupCategoryModel[] = [];
  group: GroupCategoryModel = new GroupCategoryModel();

  groupSearch: string = "";
  workspaceId: number = 0;

  groupSelected: GroupCategoryModel = new GroupCategoryModel();


  constructor(){
    this.workspaceId = parseInt(localStorage.getItem("workspaceId") || '0');
    this.getAllByUserId();
  }

  getAllByUserId() {
    this._groupCategoryService.readAllByUserId(this.workspaceId).subscribe({
      next: (response) => {
        this.groups = response;
        this.groupsSearched = response;
      },
      error: (error: any) => {
        alert(error.error.message);
      }
    });
  }

  create() {
    this._groupCategoryService.createByUserId(this.group, this.workspaceId).subscribe({
      next: (response) => {
        this.getAllByUserId();
      },
      error: (error: any) => {
        alert(error.error.message);
      }
    });
  }

  receiveDataFromSearch(event: any) {
    this.groups = this.groupsSearched;

    this.groupSearch = event.text;
    this.group.name = event.text;

    this.groups = event.data;
    if(this.groupSearch == '')
      this.groups = this.groupsSearched;
  }

  onItemChange() {
    this.sendGroupSelected.emit(this.groupSelected);
  }

}