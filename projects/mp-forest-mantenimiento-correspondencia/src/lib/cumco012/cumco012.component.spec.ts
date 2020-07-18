import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CUMCO012Component } from './cumco012.component';

describe('Cumco012Component', () => {
  let component: CUMCO012Component;
  let fixture: ComponentFixture<CUMCO012Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CUMCO012Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CUMCO012Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
