import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentLineFourComponent } from './content-line-four.component';

describe('ContentLineFourComponent', () => {
  let component: ContentLineFourComponent;
  let fixture: ComponentFixture<ContentLineFourComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContentLineFourComponent]
    });
    fixture = TestBed.createComponent(ContentLineFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
