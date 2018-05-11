import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendRequestIconComponent } from './friend-request-icon.component';

describe('FriendRequestIconComponent', () => {
  let component: FriendRequestIconComponent;
  let fixture: ComponentFixture<FriendRequestIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendRequestIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendRequestIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
