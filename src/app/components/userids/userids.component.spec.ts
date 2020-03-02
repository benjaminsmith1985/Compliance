import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UseridsComponent } from './userids.component';

describe('UseridsComponent', () => {
  let component: UseridsComponent;
  let fixture: ComponentFixture<UseridsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UseridsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UseridsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
