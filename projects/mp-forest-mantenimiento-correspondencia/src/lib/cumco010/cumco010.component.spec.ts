import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CUMCO010Component } from './cumco010.component';

describe('CUMCO010Component', () => {
  let component: CUMCO010Component;
  let fixture: ComponentFixture<CUMCO010Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CUMCO010Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CUMCO010Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
