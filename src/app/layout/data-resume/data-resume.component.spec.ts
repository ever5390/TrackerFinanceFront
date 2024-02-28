import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataResumeComponent } from './data-resume.component';

describe('DataResumeComponent', () => {
  let component: DataResumeComponent;
  let fixture: ComponentFixture<DataResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataResumeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
