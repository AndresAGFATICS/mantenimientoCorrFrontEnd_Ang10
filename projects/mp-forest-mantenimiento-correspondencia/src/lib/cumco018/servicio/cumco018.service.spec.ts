import { TestBed } from '@angular/core/testing';

import { Cumco018Service } from './cumco018.service';

describe('Cumco018Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Cumco018Service = TestBed.get(Cumco018Service);
    expect(service).toBeTruthy();
  });
});
