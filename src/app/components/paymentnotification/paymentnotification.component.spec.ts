import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentnotificationComponent } from './paymentnotification.component';

describe('PaymentnotificationComponent', () => {
  let component: PaymentnotificationComponent;
  let fixture: ComponentFixture<PaymentnotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentnotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentnotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
