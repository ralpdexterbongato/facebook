import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsPreviewComponent } from './friends-preview.component';

describe('FriendsPreviewComponent', () => {
  let component: FriendsPreviewComponent;
  let fixture: ComponentFixture<FriendsPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendsPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
