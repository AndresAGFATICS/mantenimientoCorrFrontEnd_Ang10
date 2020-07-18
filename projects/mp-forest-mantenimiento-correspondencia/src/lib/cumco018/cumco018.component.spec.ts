import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CUMCO018Component } from './cumco018.component';

describe('CUMCO018Component', () => {
  let component: CUMCO018Component;
  let fixture: ComponentFixture<CUMCO018Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CUMCO018Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CUMCO018Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
