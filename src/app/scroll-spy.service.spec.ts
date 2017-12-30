import { TestBed, inject } from '@angular/core/testing';

import { ScrollSpyService } from './scroll-spy.service';

describe('ScrollspyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [ScrollSpyService]
    });
  });

    it('should be created', inject([ScrollSpyService], (service: ScrollspyService) => {
    expect(service).toBeTruthy();
  }));
});
