import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurbenefitsComponent } from './ourbenefits.component';

describe('OurbenefitsComponent', () => {
  let component: OurbenefitsComponent;
  let fixture: ComponentFixture<OurbenefitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OurbenefitsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OurbenefitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
