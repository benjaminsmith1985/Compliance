import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentinvoiceComponent } from './currentinvoice.component';

describe('CurrentinvoiceComponent', () => {
  let component: CurrentinvoiceComponent;
  let fixture: ComponentFixture<CurrentinvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentinvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentinvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
