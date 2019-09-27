import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneSelectionComponent } from './zone-selection.component';

describe('ZoneSelectionComponent', () => {
  let component: ZoneSelectionComponent;
  let fixture: ComponentFixture<ZoneSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoneSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoneSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
