import { TestBed } from '@angular/core/testing';

import { MpForestMantenimientoCorrespondenciaService } from './mp-forest-mantenimiento-correspondencia.service';

describe('MpForestMantenimientoCorrespondenciaService', () => {
  let service: MpForestMantenimientoCorrespondenciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MpForestMantenimientoCorrespondenciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
