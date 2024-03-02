import { Component, EventEmitter, Output, inject } from '@angular/core';
import { Tag } from 'src/app/models/tag/tag.model';
import { TagsService } from 'src/app/services/tags/tags.service';

@Component({
  selector: 'app-transaction-tags',
  templateUrl: './transaction-tags.component.html',
  styleUrls: ['./transaction-tags.component.css']
})
export class TransactionTagsComponent {
  @Output() sendOrderCloseFormularyPopUp = new EventEmitter<any>();
  @Output("sendTagsSelected") sendTagsSelected = new EventEmitter<any>();

  _tagService = inject(TagsService);
  tags: Tag[] = [];
  tagsSelected: Tag[] = [];
  itemsSearched: Tag[] = [];

  newTag: Tag = new Tag();
  workspaceId: number = 0;

  constructor() {
    this.workspaceId = parseInt(localStorage.getItem("workspaceId") || '0');
    this.getAll();
  }

  getAll() {
    this._tagService.readAllByUserId(this.workspaceId).subscribe({
      next:(response) =>{
        this.tags = response
        this.itemsSearched = response;
      },
      error:(error: any)=> {
        alert(error.error.message);
      }
    });
  }

  onChangeCategory(event: any) {
    const idCateSelected = event.target.value;
    const isChecked = event.target.checked;

    this.tagsSelected = this.tags.map((pay) => {
        if(pay.id == idCateSelected) {
          pay.isChecked = isChecked;
          return pay;
        }
       return pay;
    });    
  }

  receiveDataFromSearch(event: any) {
    this.newTag.name = event.text;
    this.tags = event.data;
    if(event.text == '')
      this.tags = this.itemsSearched;
  }

  create() {
    this._tagService.createByUserId(this.newTag, this.workspaceId).subscribe({
      next: (response) => {
        this.getAll();
      },
      error: (error: any) => {
        alert(error.error.message);
      }
    });
  }

  sendItemSelectedMethod() {
    this.tagsSelected = this.tagsSelected.filter(item=>item.isChecked == true);
    this.sendTagsSelected.emit({"object":this.tagsSelected, "type":"tags"});
  }

  closeFormularyPopUp() {
    this.sendOrderCloseFormularyPopUp.emit();
  }
}
