import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizeJewelryComponent } from './customize-jewelry.component';

describe('CustomizeJewelryComponent', () => {
  let component: CustomizeJewelryComponent;
  let fixture: ComponentFixture<CustomizeJewelryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomizeJewelryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomizeJewelryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
