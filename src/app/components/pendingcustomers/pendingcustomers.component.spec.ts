import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingcustomersComponent } from './pendingcustomers.component';

describe('PendingcustomersComponent', () => {
  let component: PendingcustomersComponent;
  let fixture: ComponentFixture<PendingcustomersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingcustomersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingcustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
