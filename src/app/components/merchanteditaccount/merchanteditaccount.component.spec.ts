import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchanteditaccountComponent } from './merchanteditaccount.component';

describe('MerchanteditaccountComponent', () => {
  let component: MerchanteditaccountComponent;
  let fixture: ComponentFixture<MerchanteditaccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchanteditaccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchanteditaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
