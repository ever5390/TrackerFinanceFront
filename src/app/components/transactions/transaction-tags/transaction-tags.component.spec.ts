import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionTagsComponent } from './transaction-tags.component';

describe('TransactionTagsComponent', () => {
  let component: TransactionTagsComponent;
  let fixture: ComponentFixture<TransactionTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionTagsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
