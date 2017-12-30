import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SandboxSidebarLinksComponent } from './sandbox-sidebar-links.component';

describe('SandboxSidebarLinksComponent', () => {
  let component: SandboxSidebarLinksComponent;
  let fixture: ComponentFixture<SandboxSidebarLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SandboxSidebarLinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SandboxSidebarLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
