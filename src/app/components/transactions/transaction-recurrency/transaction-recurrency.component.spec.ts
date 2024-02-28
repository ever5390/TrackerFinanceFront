import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionRecurrencyComponent } from './transaction-recurrency.component';

describe('TransactionRecurrencyComponent', () => {
  let component: TransactionRecurrencyComponent;
  let fixture: ComponentFixture<TransactionRecurrencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionRecurrencyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionRecurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
