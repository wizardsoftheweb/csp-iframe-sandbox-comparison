import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavanchorComponent } from './navanchor.component';

describe('NavanchorComponent', () => {
  let component: NavanchorComponent;
  let fixture: ComponentFixture<NavanchorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavanchorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavanchorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
