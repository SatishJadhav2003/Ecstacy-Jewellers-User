import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDescComponent } from './order-desc.component';

describe('OrderDescComponent', () => {
  let component: OrderDescComponent;
  let fixture: ComponentFixture<OrderDescComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderDescComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
