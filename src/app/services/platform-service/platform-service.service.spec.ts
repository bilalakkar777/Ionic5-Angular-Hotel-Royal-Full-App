import { TestBed } from '@angular/core/testing';

import { PlatformStateService } from './platform-service.service';

describe('PlatformServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlatformStateService = TestBed.get(PlatformStateService);
    expect(service).toBeTruthy();
  });
});
