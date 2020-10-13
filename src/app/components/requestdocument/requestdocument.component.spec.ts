import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestdocumentComponent } from './requestdocument.component';

describe('RequestdocumentComponent', () => {
  let component: RequestdocumentComponent;
  let fixture: ComponentFixture<RequestdocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestdocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestdocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
