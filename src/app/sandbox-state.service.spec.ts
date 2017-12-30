import { TestBed, inject } from '@angular/core/testing';

import { SandboxStateService } from './sandbox-state.service';

describe('SandboxStateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SandboxStateService]
    });
  });

  it('should be created', inject([SandboxStateService], (service: SandboxStateService) => {
    expect(service).toBeTruthy();
  }));
});
