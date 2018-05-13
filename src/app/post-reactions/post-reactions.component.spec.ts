import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostReactionsComponent } from './post-reactions.component';

describe('PostReactionsComponent', () => {
  let component: PostReactionsComponent;
  let fixture: ComponentFixture<PostReactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostReactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostReactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
