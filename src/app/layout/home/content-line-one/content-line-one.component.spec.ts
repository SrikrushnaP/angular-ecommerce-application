import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentLineOneComponent } from './content-line-one.component';

describe('ContentLineOneComponent', () => {
  let component: ContentLineOneComponent;
  let fixture: ComponentFixture<ContentLineOneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContentLineOneComponent]
    });
    fixture = TestBed.createComponent(ContentLineOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
