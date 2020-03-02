import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiureportsComponent } from './fiureports.component';

describe('FiureportsComponent', () => {
  let component: FiureportsComponent;
  let fixture: ComponentFixture<FiureportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiureportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiureportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
