import { TestBed } from '@angular/core/testing';

import { CoordService } from './coord.service';

describe('CoordService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CoordService = TestBed.get(CoordService);
    expect(service).toBeTruthy();
  });
});
