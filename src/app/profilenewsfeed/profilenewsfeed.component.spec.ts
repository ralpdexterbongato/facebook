import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostedComponent } from './posted.component';

describe('PostedComponent', () => {
  let component: PostedComponent;
  let fixture: ComponentFixture<PostedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
