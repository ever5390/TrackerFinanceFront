import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionAccountsComponent } from './transaction-accounts.component';

describe('TransactionAccountsComponent', () => {
  let component: TransactionAccountsComponent;
  let fixture: ComponentFixture<TransactionAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionAccountsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
