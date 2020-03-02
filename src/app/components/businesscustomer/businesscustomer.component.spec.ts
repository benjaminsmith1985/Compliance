import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinesscustomerComponent } from './businesscustomer.component';

describe('BusinesscustomerComponent', () => {
  let component: BusinesscustomerComponent;
  let fixture: ComponentFixture<BusinesscustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinesscustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinesscustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
