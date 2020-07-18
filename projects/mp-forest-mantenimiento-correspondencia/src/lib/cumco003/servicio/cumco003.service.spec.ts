import { TestBed } from '@angular/core/testing';

import { Cumco003Service } from './cumco003.service';

describe('Cumco003Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Cumco003Service = TestBed.get(Cumco003Service);
    expect(service).toBeTruthy();
  });
});
