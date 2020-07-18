import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CUMCO019Component } from './cumco019.component';

describe('CUMCO019Component', () => {
  let component: CUMCO019Component;
  let fixture: ComponentFixture<CUMCO019Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CUMCO019Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CUMCO019Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
