import { TestBed } from '@angular/core/testing';

import { LegaformService } from './legaform.service';

describe('LegaformService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LegaformService = TestBed.get(LegaformService);
    expect(service).toBeTruthy();
  });
});
