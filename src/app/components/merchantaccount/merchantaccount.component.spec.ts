import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantaccountComponent } from './merchantaccount.component';

describe('MerchantaccountComponent', () => {
  let component: MerchantaccountComponent;
  let fixture: ComponentFixture<MerchantaccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchantaccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
