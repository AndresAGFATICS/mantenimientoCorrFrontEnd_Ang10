import { TestBed } from '@angular/core/testing';

import { TerritorialActivaService } from './territorial-activa.service';

describe('TerritorialActivaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TerritorialActivaService = TestBed.get(TerritorialActivaService);
    expect(service).toBeTruthy();
  });
});
