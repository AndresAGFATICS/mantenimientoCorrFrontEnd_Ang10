import { TestBed } from '@angular/core/testing';

import { Cumco009Service } from './cumco009.service';

describe('Cumco009Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Cumco009Service = TestBed.get(Cumco009Service);
    expect(service).toBeTruthy();
  });
});
