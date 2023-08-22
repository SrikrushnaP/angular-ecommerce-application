import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentLineTwoComponent } from './content-line-two.component';

describe('ContentLineTwoComponent', () => {
  let component: ContentLineTwoComponent;
  let fixture: ComponentFixture<ContentLineTwoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContentLineTwoComponent]
    });
    fixture = TestBed.createComponent(ContentLineTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
