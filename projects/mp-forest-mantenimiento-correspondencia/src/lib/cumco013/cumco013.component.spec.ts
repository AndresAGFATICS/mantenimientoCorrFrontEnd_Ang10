import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CUMCO013Component } from './cumco013.component';

describe('CUMCO013Component', () => {
  let component: CUMCO013Component;
  let fixture: ComponentFixture<CUMCO013Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CUMCO013Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CUMCO013Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
