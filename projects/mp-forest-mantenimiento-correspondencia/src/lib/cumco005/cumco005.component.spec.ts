import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Cumco005Component } from './cumco005.component';

describe('Cumco005Component', () => {
  let component: Cumco005Component;
  let fixture: ComponentFixture<Cumco005Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Cumco005Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cumco005Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
