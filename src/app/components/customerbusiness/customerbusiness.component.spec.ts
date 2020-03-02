import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerbusinessComponent } from './customerbusiness.component';

describe('CustomerbusinessComponent', () => {
  let component: CustomerbusinessComponent;
  let fixture: ComponentFixture<CustomerbusinessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerbusinessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerbusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
