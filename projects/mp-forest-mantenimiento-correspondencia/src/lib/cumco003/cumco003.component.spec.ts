import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Cumco003Component } from './cumco003.component';

describe('Cumco003Component', () => {
  let component: Cumco003Component;
  let fixture: ComponentFixture<Cumco003Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Cumco003Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cumco003Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
