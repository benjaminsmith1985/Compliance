import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinesstransactionComponent } from './businesstransaction.component';

describe('BusinesstransactionComponent', () => {
  let component: BusinesstransactionComponent;
  let fixture: ComponentFixture<BusinesstransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinesstransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinesstransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
