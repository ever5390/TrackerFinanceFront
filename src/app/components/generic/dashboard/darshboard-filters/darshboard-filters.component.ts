import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from 'src/app/interfaces/ItemFiltered.interface';
import { Filter } from 'src/app/models/filter/filter.model';

@Component({
  selector: 'app-darshboard-filters',
  templateUrl: './darshboard-filters.component.html',
  styleUrls: ['./darshboard-filters.component.css']
})
export class DarshboardFiltersComponent {

  @Output() sendItemSelectedByFiltered = new EventEmitter<any>();
  @Input("receivedFilters") receivedFilters: Filter[] = []; 

  itemsFilter: Filter = new Filter();
  filtersBySelected: Item[] = [];
  itemFilteredSelected: Item = {name:"", itemSelected:"", total:0};

  constructor() {}

  showFilters(item: Filter) {
    this.itemsFilter = item;
  }

  itemFilteredSeleceted(itemSelected: Item){
    this.itemFilteredSelected.name = this.itemsFilter.item;
    this.itemFilteredSelected.itemSelected = itemSelected.name;
    this.itemFilteredSelected.total = itemSelected.total;
    this.sendItemSelectedByFiltered.emit(this.itemFilteredSelected);
  }


}