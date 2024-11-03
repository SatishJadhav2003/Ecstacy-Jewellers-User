import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizeJewelleryComponent } from './customize-jewellery.component';

describe('CustomizeJewelleryComponent', () => {
  let component: CustomizeJewelleryComponent;
  let fixture: ComponentFixture<CustomizeJewelleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomizeJewelleryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomizeJewelleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
