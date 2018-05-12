import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentReplyContainerComponent } from './comment-reply-container.component';

describe('CommentReplyContainerComponent', () => {
  let component: CommentReplyContainerComponent;
  let fixture: ComponentFixture<CommentReplyContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentReplyContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentReplyContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
