import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostboxComponent } from './postbox.component';

describe('PostboxComponent', () => {
  let component: PostboxComponent;
  let fixture: ComponentFixture<PostboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
