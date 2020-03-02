import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessaccountsComponent } from './businessaccounts.component';

describe('BusinessaccountsComponent', () => {
  let component: BusinessaccountsComponent;
  let fixture: ComponentFixture<BusinessaccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessaccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessaccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
