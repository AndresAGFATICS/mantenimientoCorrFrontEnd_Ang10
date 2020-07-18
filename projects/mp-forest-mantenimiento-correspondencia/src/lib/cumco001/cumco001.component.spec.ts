import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CUMCO001Component } from './cumco001.component';

describe('CUMCO001Component', () => {
  let component: CUMCO001Component;
  let fixture: ComponentFixture<CUMCO001Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CUMCO001Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CUMCO001Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
