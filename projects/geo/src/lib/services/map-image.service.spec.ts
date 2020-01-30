import { TestBed, inject } from '@angular/core/testing';

import { MapImageService } from './map-image.service';

describe('MapImageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapImageService]
    });
  });

  it('should be created', inject([MapImageService], (service: MapImageService) => {
    expect(service).toBeTruthy();
  }));
});
