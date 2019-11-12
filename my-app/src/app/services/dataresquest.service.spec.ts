import { TestBed } from '@angular/core/testing';

import { DataresquestService } from './dataresquest.service';

describe('DataresquestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataresquestService = TestBed.get(DataresquestService);
    expect(service).toBeTruthy();
  });
});
