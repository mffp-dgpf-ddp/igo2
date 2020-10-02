import { TestBed, inject } from '@angular/core/testing';

import { BboxService } from './bbox.service';

describe('BboxService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BboxService]
    });
  });

  it('should be created', inject([BboxService], (service: BboxService) => {
    expect(service).toBeTruthy();
  }));
});
