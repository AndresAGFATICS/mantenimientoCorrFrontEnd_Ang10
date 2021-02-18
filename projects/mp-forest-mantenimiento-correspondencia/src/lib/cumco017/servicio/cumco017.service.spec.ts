import { TestBed } from '@angular/core/testing';

import { Cumco017Service } from './cumco017.service';

describe('Cumco017Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Cumco017Service = TestBed.get(Cumco017Service);
    expect(service).toBeTruthy();
  });
});
