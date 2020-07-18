import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Cumco006Component } from './cumco006.component';

describe('Cumco006Component', () => {
  let component: Cumco006Component;
  let fixture: ComponentFixture<Cumco006Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Cumco006Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cumco006Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
