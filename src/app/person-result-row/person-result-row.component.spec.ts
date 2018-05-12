import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonResultRowComponent } from './person-result-row.component';

describe('PersonResultRowComponent', () => {
  let component: PersonResultRowComponent;
  let fixture: ComponentFixture<PersonResultRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonResultRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonResultRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
