import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallUserLoaderComponent } from './small-user-loader.component';

describe('SmallUserLoaderComponent', () => {
  let component: SmallUserLoaderComponent;
  let fixture: ComponentFixture<SmallUserLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmallUserLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallUserLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
