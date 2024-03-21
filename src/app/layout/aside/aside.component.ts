import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent {
  @Output() sendOpenCloseAsideOrder = new EventEmitter<any>();

  openCloseAsideOrder() {
    this.sendOpenCloseAsideOrder.emit();
  }
}
