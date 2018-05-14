import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentReactionsComponent } from './comment-reactions.component';

describe('CommentReactionsComponent', () => {
  let component: CommentReactionsComponent;
  let fixture: ComponentFixture<CommentReactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentReactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentReactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
