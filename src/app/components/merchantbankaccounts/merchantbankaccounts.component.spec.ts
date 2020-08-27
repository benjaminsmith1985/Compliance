import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantbankaccountsComponent } from './merchantbankaccounts.component';

describe('MerchantbankaccountsComponent', () => {
  let component: MerchantbankaccountsComponent;
  let fixture: ComponentFixture<MerchantbankaccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchantbankaccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantbankaccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
