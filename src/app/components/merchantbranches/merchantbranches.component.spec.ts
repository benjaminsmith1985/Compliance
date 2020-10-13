import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantbranchesComponent } from './merchantbranches.component';

describe('MerchantbranchesComponent', () => {
  let component: MerchantbranchesComponent;
  let fixture: ComponentFixture<MerchantbranchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchantbranchesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantbranchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
