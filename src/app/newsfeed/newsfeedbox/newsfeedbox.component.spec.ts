import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsfeedboxComponent } from './newsfeedbox.component';

describe('NewsfeedboxComponent', () => {
  let component: NewsfeedboxComponent;
  let fixture: ComponentFixture<NewsfeedboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsfeedboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsfeedboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
