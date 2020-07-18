import { TestBed } from '@angular/core/testing';

import { AnexosFisicosClaseService } from './anexos-fisicos-clase.service';

describe('AnexosFisicosClaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnexosFisicosClaseService = TestBed.get(AnexosFisicosClaseService);
    expect(service).toBeTruthy();
  });
});
