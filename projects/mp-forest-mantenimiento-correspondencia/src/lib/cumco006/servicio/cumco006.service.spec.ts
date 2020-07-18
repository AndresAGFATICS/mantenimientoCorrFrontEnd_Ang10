import { TestBed } from '@angular/core/testing';

import { Cumco006Service } from './cumco006.service';

describe('Cumco006Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Cumco006Service = TestBed.get(Cumco006Service);
    expect(service).toBeTruthy();
  });
});
