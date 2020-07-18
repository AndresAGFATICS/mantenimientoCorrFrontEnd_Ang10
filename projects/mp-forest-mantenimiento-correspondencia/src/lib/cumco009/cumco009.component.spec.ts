import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CUMCO009Component } from './cumco009.component';

describe('CUMCO009Component', () => {
  let component: CUMCO009Component;
  let fixture: ComponentFixture<CUMCO009Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CUMCO009Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CUMCO009Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
