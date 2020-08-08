import { TestBed } from '@angular/core/testing';

import { Cumco008Service } from './cumco008.service';

describe('Cumco008Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Cumco008Service = TestBed.get(Cumco008Service);
    expect(service).toBeTruthy();
  });
});
