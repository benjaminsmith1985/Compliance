import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddseatsComponent } from './addseats.component';

describe('AddseatsComponent', () => {
  let component: AddseatsComponent;
  let fixture: ComponentFixture<AddseatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddseatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddseatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
