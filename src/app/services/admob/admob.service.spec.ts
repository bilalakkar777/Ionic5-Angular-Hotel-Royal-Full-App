import { TestBed } from '@angular/core/testing';

import { AdmobService } from './admob.service';

describe('AdmobService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdmobService = TestBed.get(AdmobService);
    expect(service).toBeTruthy();
  });
});
