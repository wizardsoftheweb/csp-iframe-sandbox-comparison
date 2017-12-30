import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SandboxTabsComponent } from './sandbox-tabs.component';

describe('SandboxTabsComponent', () => {
  let component: SandboxTabsComponent;
  let fixture: ComponentFixture<SandboxTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SandboxTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SandboxTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
