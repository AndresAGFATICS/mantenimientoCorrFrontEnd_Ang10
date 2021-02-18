import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CUMCO014Component } from './cumco014.component';

describe('CUMCO014Component', () => {
  let component: CUMCO014Component;
  let fixture: ComponentFixture<CUMCO014Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CUMCO014Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CUMCO014Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
