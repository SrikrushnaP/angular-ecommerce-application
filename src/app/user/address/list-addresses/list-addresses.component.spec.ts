import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAddressesComponent } from './list-addresses.component';

describe('ListAddressesComponent', () => {
  let component: ListAddressesComponent;
  let fixture: ComponentFixture<ListAddressesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListAddressesComponent]
    });
    fixture = TestBed.createComponent(ListAddressesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
