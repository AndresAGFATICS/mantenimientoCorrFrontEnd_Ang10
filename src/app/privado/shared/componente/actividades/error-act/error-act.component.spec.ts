import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorActComponent } from './error-act.component';

describe('ErrorActComponent', () => {
  let component: ErrorActComponent;
  let fixture: ComponentFixture<ErrorActComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorActComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorActComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
