import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantseatsComponent } from './merchantseats.component';

describe('MerchantseatsComponent', () => {
  let component: MerchantseatsComponent;
  let fixture: ComponentFixture<MerchantseatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchantseatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantseatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
