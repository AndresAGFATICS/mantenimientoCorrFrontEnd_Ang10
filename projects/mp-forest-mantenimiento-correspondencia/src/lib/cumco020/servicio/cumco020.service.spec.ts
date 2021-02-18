import { TestBed } from '@angular/core/testing';

import { Cumco020Service } from './cumco020.service';

describe('Cumco020Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Cumco020Service = TestBed.get(Cumco020Service);
    expect(service).toBeTruthy();
  });
});
