import { TestBed } from '@angular/core/testing';

import { FeatureLayerService } from './feature-layer.service';

describe('FeatureLayerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FeatureLayerService = TestBed.get(FeatureLayerService);
    expect(service).toBeTruthy();
  });
});
