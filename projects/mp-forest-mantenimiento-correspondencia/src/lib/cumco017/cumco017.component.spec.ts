import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Cumco017Component } from './cumco017.component';

describe('Cumco017Component', () => {
  let component: Cumco017Component;
  let fixture: ComponentFixture<Cumco017Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Cumco017Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cumco017Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
