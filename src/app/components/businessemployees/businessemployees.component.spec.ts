import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessemployeesComponent } from './businessemployees.component';

describe('BusinessemployeesComponent', () => {
  let component: BusinessemployeesComponent;
  let fixture: ComponentFixture<BusinessemployeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessemployeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessemployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
