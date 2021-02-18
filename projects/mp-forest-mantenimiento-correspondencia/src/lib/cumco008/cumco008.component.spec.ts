import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Cumco008Component } from './cumco008.component';

describe('Cumco008Component', () => {
  let component: Cumco008Component;
  let fixture: ComponentFixture<Cumco008Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Cumco008Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cumco008Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
