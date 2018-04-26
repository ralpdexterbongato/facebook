import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestLogsComponent } from './latest-logs.component';

describe('LatestLogsComponent', () => {
  let component: LatestLogsComponent;
  let fixture: ComponentFixture<LatestLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LatestLogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
