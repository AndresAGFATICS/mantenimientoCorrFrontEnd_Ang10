import { TestBed } from '@angular/core/testing';

import { Cumco014Service } from './cumco014.service';

describe('Cumco014Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Cumco014Service = TestBed.get(Cumco014Service);
    expect(service).toBeTruthy();
  });
});
