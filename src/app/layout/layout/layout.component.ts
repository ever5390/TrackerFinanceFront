import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  @ViewChild('main') main!: ElementRef;

  widthAside: string = "250px";
  isOpen: boolean = false;
  isMobile: boolean = false;
  flagShowAsideComponent:boolean = false;

  constructor() { }

  receivedOpenCloseAsideOrder() {
    this.isOpen = !this.isOpen;

    if(this.isMobile)
      this.widthAside = "100%";

    let timeShowHidden = 0;
    if(this.isOpen) timeShowHidden = 200;
    if(!this.isOpen) timeShowHidden = 0;

    setTimeout(() => {
      this.flagShowAsideComponent = !this.flagShowAsideComponent;
    }, timeShowHidden);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.isMobile = this.main.nativeElement.offsetWidth <= 480;
    }, 200);
  }

}
