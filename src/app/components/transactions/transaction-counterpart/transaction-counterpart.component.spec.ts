import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionCounterpartComponent } from './transaction-counterpart.component';

describe('TransactionCounterpartComponent', () => {
  let component: TransactionCounterpartComponent;
  let fixture: ComponentFixture<TransactionCounterpartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionCounterpartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionCounterpartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
