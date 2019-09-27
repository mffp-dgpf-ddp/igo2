import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureViewerComponent } from './feature-viewer.component';

describe('FeatureViewerComponent', () => {
  let component: FeatureViewerComponent;
  let fixture: ComponentFixture<FeatureViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeatureViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
