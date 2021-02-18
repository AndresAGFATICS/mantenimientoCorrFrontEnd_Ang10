import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Cumco016Component } from './cumco016.component';

describe('Cumco016Component', () => {
  let component: Cumco016Component;
  let fixture: ComponentFixture<Cumco016Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Cumco016Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cumco016Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
