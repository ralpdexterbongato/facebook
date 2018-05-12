import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentReplyRowComponent } from './comment-reply-row.component';

describe('CommentReplyRowComponent', () => {
  let component: CommentReplyRowComponent;
  let fixture: ComponentFixture<CommentReplyRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentReplyRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentReplyRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
