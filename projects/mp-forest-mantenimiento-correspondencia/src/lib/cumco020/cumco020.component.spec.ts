import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Cumco020Component } from './cumco020.component';

describe('Cumco020Component', () => {
  let component: Cumco020Component;
  let fixture: ComponentFixture<Cumco020Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Cumco020Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cumco020Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
