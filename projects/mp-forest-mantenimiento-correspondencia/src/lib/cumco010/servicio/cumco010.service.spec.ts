import { TestBed } from '@angular/core/testing';

import { Cumco010Service } from './cumco010.service';

describe('Cumco010Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Cumco010Service = TestBed.get(Cumco010Service);
    expect(service).toBeTruthy();
  });
});
