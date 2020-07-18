import { TestBed } from '@angular/core/testing';

import { EjeTematicoService } from './eje-tematico.service';

describe('EjeTematicoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EjeTematicoService = TestBed.get(EjeTematicoService);
    expect(service).toBeTruthy();
  });
});
