import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartPaymentComponent } from './cart-payment.component';

describe('CartPaymentComponent', () => {
  let component: CartPaymentComponent;
  let fixture: ComponentFixture<CartPaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartPaymentComponent]
    });
    fixture = TestBed.createComponent(CartPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
