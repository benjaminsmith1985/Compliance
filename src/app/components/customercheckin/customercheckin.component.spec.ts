import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomercheckinComponent } from './customercheckin.component';

describe('CustomercheckinComponent', () => {
  let component: CustomercheckinComponent;
  let fixture: ComponentFixture<CustomercheckinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomercheckinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomercheckinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
