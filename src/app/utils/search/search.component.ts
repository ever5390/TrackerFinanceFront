import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  subject = new Subject();
  txtSearch: string = '';
  dataListToProcessAndEmitToFather: any[] = [];
  @Input() receivedDataFromFather: any[] = [];
  @Output() sendDataFromSearchToFather = new EventEmitter();


  noData: boolean = false;
  constructor() { }

  ngOnInit(): void {
    // setTimeout(() => {
      this.dataListToProcessAndEmitToFather = this.receivedDataFromFather;
      this.searchActivateFunction();
    // }, 5000);
  }

  searchActivateFunction() {
      this.subject.pipe(
        debounceTime(100)
      ).subscribe((searchText:any) => {
        this.dataListToProcessAndEmitToFather = this.receivedDataFromFather.filter(item => {
              return item.name.toUpperCase().includes(searchText.toUpperCase()) 
            }
          );
          if(this.dataListToProcessAndEmitToFather.length == 0) {
            this.noData =true;
          } else {
            this.noData = false;
          }
          this.sendDataFromSearchToFather.emit({data:this.dataListToProcessAndEmitToFather, text:searchText});                   
        }
      )
  }

  searchMethod(evt:any) {
    const searchText = evt.target.value;
    this.subject.next(searchText)
  }

}
