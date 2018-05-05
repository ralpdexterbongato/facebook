import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifysuccessComponent } from './verifysuccess.component';

describe('VerifysuccessComponent', () => {
  let component: VerifysuccessComponent;
  let fixture: ComponentFixture<VerifysuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifysuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifysuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
