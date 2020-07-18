import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CUMCO004Component } from './cumco004.component';

describe('CUMCO004Component', () => {
  let component: CUMCO004Component;
  let fixture: ComponentFixture<CUMCO004Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CUMCO004Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CUMCO004Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
