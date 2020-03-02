import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasharingrequestComponent } from './datasharingrequest.component';

describe('DatasharingrequestComponent', () => {
  let component: DatasharingrequestComponent;
  let fixture: ComponentFixture<DatasharingrequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatasharingrequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasharingrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
