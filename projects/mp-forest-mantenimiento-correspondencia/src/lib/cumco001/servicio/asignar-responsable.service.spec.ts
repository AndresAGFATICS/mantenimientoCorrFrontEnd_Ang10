import { TestBed } from '@angular/core/testing';

import { AsignarResponsableService } from './asignar-responsable.service';

describe('AsignarResponsableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AsignarResponsableService = TestBed.get(AsignarResponsableService);
    expect(service).toBeTruthy();
  });
});
