import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasharingoptionsComponent } from './datasharingoptions.component';

describe('DatasharingoptionsComponent', () => {
  let component: DatasharingoptionsComponent;
  let fixture: ComponentFixture<DatasharingoptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatasharingoptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasharingoptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
