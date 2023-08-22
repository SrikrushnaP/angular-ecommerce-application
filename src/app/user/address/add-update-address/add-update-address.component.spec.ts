import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateAddressComponent } from './add-update-address.component';

describe('AddUpdateAddressComponent', () => {
  let component: AddUpdateAddressComponent;
  let fixture: ComponentFixture<AddUpdateAddressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddUpdateAddressComponent]
    });
    fixture = TestBed.createComponent(AddUpdateAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
