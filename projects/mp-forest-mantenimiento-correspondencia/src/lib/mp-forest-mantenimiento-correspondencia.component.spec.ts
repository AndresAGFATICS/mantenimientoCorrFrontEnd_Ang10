import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MpForestMantenimientoCorrespondenciaComponent } from './mp-forest-mantenimiento-correspondencia.component';

describe('MpForestMantenimientoCorrespondenciaComponent', () => {
  let component: MpForestMantenimientoCorrespondenciaComponent;
  let fixture: ComponentFixture<MpForestMantenimientoCorrespondenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MpForestMantenimientoCorrespondenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MpForestMantenimientoCorrespondenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
