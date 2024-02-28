import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionOperationsTypesComponent } from './transaction-operations-types.component';

describe('TransactionOperationsTypesComponent', () => {
  let component: TransactionOperationsTypesComponent;
  let fixture: ComponentFixture<TransactionOperationsTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionOperationsTypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionOperationsTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
