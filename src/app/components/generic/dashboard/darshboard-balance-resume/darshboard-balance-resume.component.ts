import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-darshboard-balance-resume',
  templateUrl: './darshboard-balance-resume.component.html',
  styleUrls: ['./darshboard-balance-resume.component.css']
})
export class DarshboardBalanceResumeComponent {

  @Input("balanceReceivedIN") balanceReceivedIN: number = 0.00;
  @Input("balanceReceivedOUT") balanceReceivedOUT: number = 0.00;
  @Input("nameAccountFilter") nameAccountFilter: string = '';
  @Input("nameTimeFilterReceived") nameTimeFilterReceived: string = '';
  @Output() childEvent = new EventEmitter<boolean>();

  constructor() {
  }

  resetAllFilters() {
    this.childEvent.emit(true);
  }

  
}
