import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentLineThreeComponent } from './content-line-three.component';

describe('ContentLineThreeComponent', () => {
  let component: ContentLineThreeComponent;
  let fixture: ComponentFixture<ContentLineThreeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContentLineThreeComponent]
    });
    fixture = TestBed.createComponent(ContentLineThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
