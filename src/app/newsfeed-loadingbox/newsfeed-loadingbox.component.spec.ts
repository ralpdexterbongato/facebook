import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsfeedLoadingboxComponent } from './newsfeed-loadingbox.component';

describe('NewsfeedLoadingboxComponent', () => {
  let component: NewsfeedLoadingboxComponent;
  let fixture: ComponentFixture<NewsfeedLoadingboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsfeedLoadingboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsfeedLoadingboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
