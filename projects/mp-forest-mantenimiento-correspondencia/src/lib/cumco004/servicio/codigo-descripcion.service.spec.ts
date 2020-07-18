import { TestBed } from '@angular/core/testing';

import { CodigoDescripcionService } from './codigo-descripcion.service';

describe('CodigoDescripcionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CodigoDescripcionService = TestBed.get(CodigoDescripcionService);
    expect(service).toBeTruthy();
  });
});
